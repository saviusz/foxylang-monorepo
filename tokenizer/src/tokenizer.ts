import { Lexeme, LexemeType } from "./Lexeme";

export class Tokenizer {
    private charNum = 0;
    private line = 0;
    private column = 0;
    private input = "";

    states : Array<{ charNum: number, line: number, column: number }> = [];

    private logEnabled = true;
    push() {
        this.states.push({
            charNum: this.charNum,
            line: this.line,
            column: this.column,
        })
    }

    pop() {
        const state = this.states.pop();
        if (!state) throw new Error("No state to pop");
        this.charNum = state.charNum;
        this.line = state.line;
        this.column = state.column;
    }

    drop() {
        this.states.pop();
    }

    reset(input: string) {
        this.line = 1;
        this.column = 1;
        this.charNum = 0;
        this.input = input;
    }

    tokenize(input: string): Lexeme[] {
        this.reset(input);
        const tokens : Lexeme[] = [];
        while (true) {
            const token = this.nextToken();
            tokens.push(token);
            if (token.type == "EOF") break;
        }
        return tokens;
    }

    private lookup(): string | null {
        const char = this.input.charAt(this.charNum);
        return char || null;
    }

    private consume(): string {
        const char = this.input.charAt(this.charNum++);
        if (char == "\n") {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
        }
        return char;
    }

    nextToken(): Lexeme {

        const nextChar = this.lookup();

        if (nextChar == null) {
            return { line: this.line, column: this.column, type: "EOF", value: "" };
        }

        if (isWhitespace(nextChar)) return this.parseWhitespace();
        if (isNewline(nextChar)) return this.parseNewline();

        if (this.lookup() === "/") {
            const lexeme : Lexeme | null = this.parseComment();
            if (lexeme) return lexeme;
        };

        if (isOperator(nextChar)) return this.parseOperator();

        return { line: this.line, column: this.column, type: "unknown", value: this.consume() };
    }

    parseWhitespace() : Lexeme{
        let value = "";

        while (this.lookup() != null && isWhitespace(this.lookup()!)) {
            value += this.consume();
        }
        return { line: this.line, column: this.column, type: "whitespace", value: value };
    }

    parseNewline() : Lexeme{
        let value = "";
        while (this.lookup() != null && isNewline(this.lookup()!)) {
            value += this.consume();
        }
        return { line: this.line, column: this.column, type: "linebreak", value: value };
    }

    parseComment() : Lexeme | null {
        this.push()
        this.consume();
        if (this.lookup() === "/") return this.parseLineComment();
        if (this.lookup() === "*") return this.parseBlockComment();
        this.pop();
        return null;
    }

    parseLineComment() : Lexeme {
        this.consume()
        let value = "";
        while (this.lookup() != null && !isNewline(this.lookup()!)) {
            value += this.consume();
        }
        return { line: this.line, column: this.column, type: "comment", value: value };
    }

    parseBlockComment() : Lexeme {
        this.consume();
        let value = "";
        while (this.lookup() !== null) {
            this.push()
            if (this.lookup() === "*") {
                this.push();
                this.consume();
                if (this.lookup() === "/") {
                    this.drop();
                    this.drop();
                    break;
                }
                this.pop();

            }
            this.pop();
            value += this.consume();
        }
        this.consume();
        this.consume();
        this.drop();
        return { line: this.line, column: this.column, type: "comment", value: value };
    }

    parseOperator() : Lexeme {
        let value = "";
        while (this.lookup() != null && isOperator(this.lookup()!)) {
            value += this.consume();
        }
        return { line: this.line, column: this.column, type: "symbol", value: value };
    }
}

function isWhitespace(char: string): boolean {
    return char == " " || char == "\t";
}

function isNewline(char: string): boolean {
    return char == "\n" || char == "\r";
}

function isOperator(char: string): boolean {
    return "[](){}<>".includes(char ?? "");
}
