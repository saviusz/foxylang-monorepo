import { Lexeme } from "@saviusz/foxylang-tokenizer/index";
import { LexemeType } from "../../tokenizer/src/Lexeme";
declare class ParseContext {
    private tokens;
    currentIndex: number;
    stateSaves: {
        currentIndex: number;
    }[];
    constructor(tokens: Lexeme[]);
    lookAheadToken(): Lexeme;
    lookAheadType(): LexemeType;
    consumeType(type: LexemeType): false | Lexeme;
    consumeValue(value: string): false | Lexeme;
    consume(): void;
    pushState(): void;
    popState(): void;
}
export declare function parse(tokens: Lexeme[]): void;
export declare function skipWhitespace(p: ParseContext): void;
export declare function parseIdentifier(p: ParseContext): void;
export {};
//# sourceMappingURL=parser.d.ts.map