import { Lexeme } from "./Lexeme";
export declare class Tokenizer {
    private charNum;
    private line;
    private column;
    private input;
    reset(input: string): void;
    private getNextType;
    private consume;
    private getNextToken;
    tokenize(input: string): Lexeme[];
}
//# sourceMappingURL=tokenizer.d.ts.map