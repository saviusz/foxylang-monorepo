import { describe, it, expect, beforeEach } from "vitest";
import { Tokenizer } from "./tokenizer"; // Adjust path as necessary

let tokenizer: Tokenizer;

beforeEach(() => {
  tokenizer = new Tokenizer();
});

describe("Tokenizer.nextToken", () => {
  it("returns EOF token for empty input", () => {
    tokenizer.reset("");
    const token = tokenizer.nextToken();
    expect(token.kind).toBe("EOF");
    expect(token.start).toBe(0);
    expect(token.end).toBe(0);
    expect(token.line).toBe(1);
    expect(token.column).toBe(1);
  });

  const cases = [
    ["whitespace",      "   \t",        { kind: "whitespace",   value: "   \t",     start: 0, end: 4,   line: 1, column: 1 }],
    ["newline",         "\n",           { kind: "linebreak",    value: "\n",        start: 0, end: 1,   line: 1, column: 1 }],
    ["line comment",    "// hello",     { kind: "comment",      value: " hello",    start: 0, end: 8,   line: 1, column: 1 }],
    ["block comment",   "/* hello */",  { kind: "comment",      value: " hello ",   start: 0, end: 11,  line: 1, column: 1 }],
    ["string literal",  "\"kot\"",      { kind: "text",         value: "kot",       start: 0, end: 5,   line: 1, column: 1 }],
    ["identifier",      "fooBar_1",     { kind: "identifier",   value: "fooBar_1",  start: 0, end: 8,   line: 1, column: 1 }],
    ["number",          "12345",        { kind: "number",       value: "12345",     start: 0, end: 5,   line: 1, column: 1 }],
    ["single operator", "[",            { kind: "operator",     value: "[",         start: 0, end: 1,   line: 1, column: 1 }],
  ] as const;

  it.each(cases)("parses %s (%s)", (_, input, expected) => {
    tokenizer.reset(input);
    const token = tokenizer.nextToken();
    expect(token).toMatchObject(expected);
  });

  it("parses sequence of mixed tokens", () => {
    tokenizer.reset("foo = \"bar\" // comment\n");
    
    expect(tokenizer.nextToken()).toMatchObject({ kind: "identifier", value: "foo", start: 0, end: 3, line: 1, column: 1 });
    expect(tokenizer.nextToken()).toMatchObject({ kind: "whitespace", value: " ", start: 3, end: 4, line: 1, column: 4 });
    expect(tokenizer.nextToken()).toMatchObject({ kind: "operator", value: "=", start: 4, end: 5, line: 1, column: 5 });
    expect(tokenizer.nextToken()).toMatchObject({ kind: "whitespace", value: " ", start: 5, end: 6, line: 1, column: 6 });
    expect(tokenizer.nextToken()).toMatchObject({ kind: "text", value: "bar", start: 6, end: 11, line: 1, column: 7 });
    expect(tokenizer.nextToken()).toMatchObject({ kind: "whitespace", value: " ", start: 11, end: 12, line: 1, column: 12 });
    expect(tokenizer.nextToken()).toMatchObject({ kind: "comment", value: " comment", start: 12, end: 22, line: 1, column: 13 });
    expect(tokenizer.nextToken()).toMatchObject({ kind: "linebreak", value: "\n", start: 22, end: 23, line: 1, column: 23 });
  });
});

describe("Tokenizer state stack", () => {
  it("restores pushed state with pop", () => {
    tokenizer.reset("foo bar");
    tokenizer.push();
    tokenizer.nextToken(); // consume "foo"
    tokenizer.pop();
    const token = tokenizer.nextToken();
    expect(token.value).toBe("foo");
    expect(token.start).toBe(0);
    expect(token.end).toBe(3);
  });

  it("does not restore dropped state", () => {
    tokenizer.reset("foo bar");
    tokenizer.push();
    tokenizer.nextToken();
    tokenizer.drop();
    const token = tokenizer.nextToken();
    expect(token.value).toBe(" ");
    expect(token.start).toBe(3);
    expect(token.end).toBe(4);
  });
});
