export declare enum LexemeType {
    Unknown = "Unknown",
    Whitespace = "Whitespace",
    NewLine = "Newline",
    Letter = "Letter",
    Digit = "Digit",
    Plus = "Plus",
    Minus = "Minus",
    Star = "Star",
    Comma = "Comma",
    Question = "Question",
    Semicolon = "Semicolon",
    FSlash = "Fslash",
    OParen = "OParen",
    CParen = "CParen",
    OCurly = "OCurly",
    CCurly = "CCurly",
    OSquere = "OSquere",
    CSquere = "CSquere",
    LessThan = "LessThan",
    MoreThan = "MoreThan",
    Amprestand = "Amprestand",
    Equal = "Equal",
    Exclaim = "Exclaim",
    Dot = "Dot",
    Colon = "Colon",
    At = "At",
    Hash = "Hash",
    Tilde = "Tilde",
    Pipe = "Pipe",
    BSlash = "BSlash",
    Accent = "Accent",
    Quote = "Quote",
    Aqute = "Aqute",
    Dash = "Dash"
}
export interface Lexeme {
    type: LexemeType;
    value: string;
}
export declare function getLexemeType(char: string): LexemeType;
export declare function getLexeme(char: string): Lexeme;
//# sourceMappingURL=Lexeme.d.ts.map