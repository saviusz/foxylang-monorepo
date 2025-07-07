export type LexemeType =
    "unknown" | "whitespace" | "linebreak" | "operator" | "identifier" | "text" | "number" | "comment" | "EOF";

export interface Lexeme {
    
    start: number;
    end: number;

    line: number;
    column: number;
    
    kind: LexemeType;

    value: string;
}