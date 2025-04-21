import { Lexeme, LexemeType } from "./Lexeme";

export class Tokenizer {
    private charNum = 0;
    private line = 0;
    private column = 0;
    private input = "";

    reset(input: string) {
        this.line = 1;
        this.column = 1;
        this.charNum = 0;
        this.input = input;
    }

    private getNextType(): LexemeType {
        const char = this.input[this.charNum];

        if (!char) return "EOF";
        if ([" ", "\t"].includes(char)) return "whitespace";
        if (["\n", "\r"].includes(char)) return "linebreak";
        if ("(){}[];,.+-*/%&|=<>!?:#@~`'\"\\^$".includes(char)) return "symbol";
        if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)) return "text";
        if ("0123456789".includes(char)) return "number";
        return "unknown";
    }

    private consume(): string {
        const char = this.input[this.charNum];
        this.charNum++;
        this.column++;
        if (char === "\n") {
            this.line++;
            this.column = 1;
        }
        return char || "";
    }

    private getNextToken(): Lexeme {
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
        })
    }



    tokenize(input: string): Lexeme[] {
        this.reset(input);

        const lexemes : Lexeme[] = [];

        while (this.charNum < this.input.length) {
            lexemes.push(this.getNextToken());
        }

        return lexemes;
    }
}