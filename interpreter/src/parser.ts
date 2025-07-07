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

import { Lexeme } from "@saviusz/foxylang-tokenizer/index";
import { LexemeType } from "../../tokenizer/src/Lexeme";

class ParseContext {
    currentIndex: number = 0;

    stateSaves: {
        currentIndex: number
    }[] = [];
    
    constructor(
        private tokens: Lexeme[]
    ) {}

    lookAheadToken(): Lexeme {
        return this.tokens[this.currentIndex] ?? {
            type: "EOF",
            value: "",
            line: Infinity,
            column: Infinity
        };
    }

    lookAheadType(): LexemeType {
        return this.lookAheadToken().type;
    }

    consumeType(type: LexemeType){
        const token = this.lookAheadToken();
        if (token.type !== type) return false;
        this.consume();
        return token;
    }

    consumeValue(value: string){
        const token = this.lookAheadToken();
        if (token.value !== value) return false;
        this.consume();
        return token;
    }

    consume() {
        this.currentIndex++;
    }

    pushState() {
        this.stateSaves.push({
            currentIndex: this.currentIndex
        })
    }

    popState() {
        const save = this.stateSaves.pop();
        if (save === undefined) throw new Error("No state to pop");
        this.currentIndex = save.currentIndex;
    }
}

export function parse(tokens: Lexeme[]) {
    const context = new ParseContext(tokens);
    
}

export function skipWhitespace(p: ParseContext) {
    while(["whitespace", "newLine"].includes(p.lookAheadType() ?? "")) p.consume();
}

export function parseIdentifier(p: ParseContext) {
    const node = {
        type: "identifier",
        identifier: null,
    }
    
    p.pushState();
    skipWhitespace(p);

    if(p.lookAheadType() === "symbol") {
        
    }

    p.popState();
}