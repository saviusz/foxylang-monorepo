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
class ParseContext {
    tokens;
    currentIndex = 0;
    constructor(tokens) {
        this.tokens = tokens;
    }
    lookAheadToken() {
        return this.tokens[this.currentIndex] ?? null;
    }
    consume() {
        this.currentIndex++;
    }
}
export {};
//# sourceMappingURL=parser.js.map