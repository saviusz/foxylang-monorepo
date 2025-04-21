"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
class Tokenizer {
    charNum = 0;
    line = 0;
    column = 0;
    input = "";
    reset(input) {
        this.line = 1;
        this.column = 1;
        this.charNum = 0;
        this.input = input;
    }
    getNextType() {
        const char = this.input[this.charNum];
        if (!char)
            return "EOF";
        if ([" ", "\t"].includes(char))
            return "whitespace";
        if (["\n", "\r"].includes(char))
            return "linebreak";
        if ("(){}[];,.+-*/%&|=<>!?:#@~`'\"\\^$".includes(char))
            return "symbol";
        if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char))
            return "text";
        if ("0123456789".includes(char))
            return "number";
        return "unknown";
    }
    consume() {
        const char = this.input[this.charNum];
        this.charNum++;
        this.column++;
        if (char === "\n") {
            this.line++;
            this.column = 1;
        }
        return char || "";
    }
    getNextToken() {
        const line = this.line;
        const column = this.column;
        let value = "";
        const type = this.getNextType();
        while (this.getNextType() === type) {
            value += this.consume();
        }
        return ({
            line: line,
            column: column,
            type: type,
            value: value
        });
    }
    tokenize(input) {
        this.reset(input);
        const lexemes = [];
        while (this.charNum < this.input.length) {
            lexemes.push(this.getNextToken());
        }
        return lexemes;
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.js.map