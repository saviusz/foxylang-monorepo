export enum LexemeType {
  Unknown = 'Unknown',
  Whitespace = 'Whitespace',
  NewLine = 'Newline',
  Letter = 'Letter',
  Digit = 'Digit',

  Plus = 'Plus',
  Minus = 'Minus',
  Star = 'Star',
  
  Comma = "Comma",
  Question = "Question",
  Semicolon = "Semicolon",

  FSlash = 'Fslash',

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
  Dash = "Dash",

}

export interface Lexeme {
    type: LexemeType,
    value: string
}

export function getLexemeType(char: string): LexemeType {
  if(char.length != 1) throw new Error(`Wrong length of char ${char.length}`);

  if ('1234567890'.includes(char)) return LexemeType.Digit;
  if (`\r\n`.includes(char)) return LexemeType.NewLine;
  if (`\t `.includes(char)) return LexemeType.Whitespace;
  if ('abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ'.includes(char)) return LexemeType.Letter;

  switch (char) {
    case "+": return LexemeType.Plus;
    case "-": return LexemeType.Minus;
    case "*": return LexemeType.Star;
    case "/": return LexemeType.FSlash;

    case "_": return LexemeType.Dash;
    case "\\": return LexemeType.BSlash;

    case "'": return LexemeType.Accent;
    case "\"": return LexemeType.Quote;
    case "`": return LexemeType.Aqute;

    case "=": return LexemeType.Equal;
    case "<": return LexemeType.LessThan;
    case ">": return LexemeType.MoreThan;

    case "?": return LexemeType.Question;
    case "!": return LexemeType.Exclaim;

    case ".": return LexemeType.Dot;
    case ",": return LexemeType.Comma;

    case ":": return LexemeType.Colon;
    case ";": return LexemeType.Semicolon;

    case "(": return LexemeType.OParen;
    case ")": return LexemeType.CParen;

    case "{": return LexemeType.OCurly;
    case "}": return LexemeType.CCurly;

    case "[": return LexemeType.OSquere;
    case "]": return LexemeType.CSquere;

    case "|": return LexemeType.Pipe;

    case "@": return LexemeType.At;
    case "#": return LexemeType.Hash;
    case "~": return LexemeType.Tilde;

  }

  return LexemeType.Unknown;
}

export function getLexeme(char: string): Lexeme {
  return {
    type: getLexemeType(char),
    value: char
  }
}