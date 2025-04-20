import { Lexeme } from "./Lexeme";
export declare enum TokenType {
    Unexpected = "Unknown",
    Whitespace = "Whitespace",
    Literal = "Literal",
    Operator = "Operator",
    Symbol = "Symbol",
    BOF = "BOF",
    EOF = "EOF",
    EOL = "EOL",
    Comment = "Comment",
    LineComment = "LineComment",
    BlockComment = "BlockComment",
    ParamsOpen = "ParamsOpen",
    GenericOpen = "GenericOpen"
}
export interface Token {
    type: TokenType;
    text: string;
    pos: number;
}
export declare function isTokenMeaningfull(tokenType: TokenType): tokenType is TokenType.Unexpected | TokenType.Literal | TokenType.Operator | TokenType.Symbol | TokenType.BOF | TokenType.EOF | TokenType.Comment | TokenType.LineComment | TokenType.BlockComment | TokenType.ParamsOpen | TokenType.GenericOpen;
export declare function getTokenType(lastMeaningfullToken: TokenType, isSpacePreceeded: boolean, lexeme: Lexeme): TokenType;
export declare function getTokens(lexemes: Array<Lexeme>): Token[];
//# sourceMappingURL=Token.d.ts.map