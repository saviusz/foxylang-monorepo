"use strict";
/*
Program
├── Declaration[]
└── Statement[]

Declaration
├── ClassDeclaration
├── FunctionDeclaration
└── VariableDeclaration

FunctionDeclaration

Statement
├── Assignment
├── IfStatement
├── LoopStatement
└── Expression

Program
├── Declarations
│   ├── VariableDeclaration
│   ├── FunctionDeclaration
│   └── ClassDeclaration
└── Statements
    ├── IfStatement
    └── LoopStatement (While, For)
        └── Expressions
            ├── Literal
            ├── Identifier
            ├── BinaryExpression
            └── CallExpression
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
exports.skipWhitespace = skipWhitespace;
exports.parseIdentifier = parseIdentifier;
class ParseContext {
    tokens;
    currentIndex = 0;
    stateSaves = [];
    constructor(tokens) {
        this.tokens = tokens;
    }
    lookAheadToken() {
        return this.tokens[this.currentIndex] ?? {
            type: "EOF",
            value: "",
            line: Infinity,
            column: Infinity
        };
    }
    lookAheadType() {
        return this.lookAheadToken().type;
    }
    consumeType(type) {
        const token = this.lookAheadToken();
        if (token.type !== type)
            return false;
        this.consume();
        return token;
    }
    consumeValue(value) {
        const token = this.lookAheadToken();
        if (token.value !== value)
            return false;
        this.consume();
        return token;
    }
    consume() {
        this.currentIndex++;
    }
    pushState() {
        this.stateSaves.push({
            currentIndex: this.currentIndex
        });
    }
    popState() {
        const save = this.stateSaves.pop();
        if (save === undefined)
            throw new Error("No state to pop");
        this.currentIndex = save.currentIndex;
    }
}
function parse(tokens) {
    const context = new ParseContext(tokens);
}
function skipWhitespace(p) {
    while (["whitespace", "newLine"].includes(p.lookAheadType() ?? ""))
        p.consume();
}
function parseIdentifier(p) {
    const node = {
        type: "identifier",
        identifier: null,
    };
    p.pushState();
    skipWhitespace(p);
    p.popState();
}
//# sourceMappingURL=parser.js.map