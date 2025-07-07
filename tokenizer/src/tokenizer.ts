import { Lexeme, LexemeType } from "./Lexeme";

export class Tokenizer {
    private charNum = 0;
    private currentLine = 0;
    private currentColumn = 0;

    private startLine = 0;
    private startColumn = 0;
    private startCharNum = 0;
    
    private input = "";

    states : Array<{ charNum: number, line: number, column: number, st_line: number, st_column: number, st_charNum: number }> = [];

    private logEnabled = true;
    push() {
        this.states.push({
            charNum: this.charNum,
            line: this.currentLine,
            column: this.currentColumn,
            st_line: this.startLine,
            st_column: this.startColumn,
            st_charNum: this.startCharNum
        })
    }

    pop() {
        const state = this.states.pop();
        if (!state) throw new Error("No state to pop");
        this.charNum = state.charNum;
        this.currentLine = state.line;
        this.currentColumn = state.column;
        this.startLine = state.st_line;
        this.startColumn = state.st_column;
        this.startCharNum = state.st_charNum;
    }

    drop() {
        this.states.pop();
    }

    reset(input: string) {
        this.currentLine = 1;
        this.currentColumn = 1;
        this.charNum = 0;
        this.input = input;
    }

    tokenize(input: string): Lexeme[] {
        this.reset(input);
        const tokens : Lexeme[] = [];
        while (true) {
            const token = this.nextToken();
            tokens.push(token);
            if (token.kind == "EOF") break;
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
            this.currentLine++;
            this.currentColumn = 1;
        } else {
            this.currentColumn++;
        }
        return char;
    }

    nextToken(): Lexeme {

        const nextChar = this.lookup();

        
        this.startCharNum = this.charNum;
        this.startLine = this.currentLine;
        this.startColumn = this.currentColumn;

        if (nextChar == null) {
            return { start: this.startCharNum, end: this.charNum, line: this.startLine, column: this.startColumn, kind: "EOF", value: "" };
        }

        if (isWhitespace(nextChar)) return this.parseWhitespace();
        if (isNewline(nextChar)) return this.parseNewline();

        if (this.lookup() === "/") {
            const lexeme : Lexeme | null = this.parseComment();
            if (lexeme) return lexeme;
        };

        if (isOperator(nextChar)) return this.parseOperator();

        if (nextChar == '"') return this.parseString();

        if (nextChar == "_" || isAlpha(nextChar)) return this.parseIdentifier();

        return { start: this.startCharNum, end: this.charNum, line: this.startLine, column: this.startColumn, kind: "unknown", value: this.consume() };
    }

    parseWhitespace() : Lexeme{
        let value = "";

        while (this.lookup() != null && isWhitespace(this.lookup()!)) {
            value += this.consume();
        }
        return {
            start: this.startCharNum,
            end: this.charNum,
            line: this.startLine,
            column: this.startColumn,
            kind: "whitespace",
            value: value
        };
    }

    parseNewline() : Lexeme{
        let value = "";
        while (this.lookup() != null && isNewline(this.lookup()!)) {
            value += this.consume();
        }
        return {
            start: this.startCharNum,
            end: this.charNum,
            line: this.startLine,
            column: this.startColumn,
            kind: "linebreak",
            value: value
        };
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
        return {
            start: this.startCharNum,
            end: this.charNum,
            line: this.startLine,
            column: this.startColumn,
            kind: "comment",
            value: value
        };
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
        this.drop();
        return {
            start: this.startCharNum,
            end: this.charNum,
            line: this.startLine,
            column: this.startColumn,
            kind: "comment",
            value: value
        };
    }

    parseOperator() : Lexeme {
        let value = "";
        while (this.lookup() != null && isOperator(this.lookup()!)) {
            value += this.consume();
        }
        return { start: this.startCharNum, end: this.charNum, line: this.startLine, column: this.startColumn, kind: "operator", value: value };
    }

    parseString() : Lexeme {
        let value = "";
        this.consume();
        while (this.lookup() != null && this.lookup() !== '"') {
            value += this.consume();
        }
        this.consume();
        return {
            start: this.startCharNum,
            end: this.charNum,
            line: this.startLine,
            column: this.startColumn,
            kind: "text",
            value: value
        };
    }

    parseIdentifier() : Lexeme {
        let value = "";
        while (this.lookup() != null && isIdentifier(this.lookup()!)) {
            value += this.consume();
        }
        return { start: this.startCharNum, end: this.charNum, line: this.startLine, column: this.startColumn, kind: "identifier", value: value };
    }
}

function isWhitespace(char: string): boolean {
    return char == " " || char == "\t";
}

function isNewline(char: string): boolean {
    return char == "\n" || char == "\r";
}

function isAlpha(char: string): boolean {
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char);
}

function isDigit(char: string): boolean {
    return "0123456789".includes(char);
}

function isAlphanumeric(char: string): boolean {
    return isAlpha(char) || isDigit(char);
}

function isIdentifier(char: string){
    return isAlphanumeric(char) || char == "_";
}

function isOperator(char: string): boolean {
    return "[](){}<>=+-*/%".includes(char ?? "");
}
