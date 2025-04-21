export type LexemeType =
    "unknown" | "whitespace" | "linebreak" | "symbol" | "text" | "number" | "EOF";

export interface Lexeme {
    line: number;
    column: number;
    type: LexemeType;
    value: string;
}