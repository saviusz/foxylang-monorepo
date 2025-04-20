import { Lexeme, LexemeType } from "./Lexeme";

export enum TokenType {
  Unexpected = 'Unknown',
  Whitespace = 'Whitespace',
  Literal = 'Literal',
  Operator = 'Operator',
  Symbol = 'Symbol',
  BOF = "BOF",
  EOF = "EOF",
  EOL = "EOL",
  Comment = "Comment",
  LineComment = "LineComment",
  BlockComment = "BlockComment",
  ParamsOpen = "ParamsOpen",
  GenericOpen = "GenericOpen",

}

export interface Token {
  type: TokenType,
  text: string,
  pos: number,
}

export function isTokenMeaningfull(tokenType: TokenType){
  return tokenType != TokenType.Whitespace && tokenType != TokenType.EOL
}

export function getTokenType(lastMeaningfullToken: TokenType, isSpacePreceeded: boolean, lexeme: Lexeme): TokenType {

  switch (lexeme.type) {
    case LexemeType.Whitespace: return TokenType.Whitespace;
    case LexemeType.NewLine: return TokenType.EOL;
    
    case LexemeType.Star:
    case LexemeType.FSlash:
      return TokenType.Operator;
  }

  switch (lastMeaningfullToken) {
    case TokenType.BOF: switch (lexeme.type) {
      case LexemeType.Letter: return TokenType.Symbol;
    }
    case TokenType.Symbol: switch (lexeme.type) {
      case LexemeType.Letter: 
      case LexemeType.Digit: return TokenType.Symbol;
      case LexemeType.OParen: return TokenType.ParamsOpen;
      case LexemeType.Comma: return TokenType.Operator;
      case LexemeType.LessThan: return isSpacePreceeded ? TokenType.Operator : TokenType.GenericOpen;
    }
    case TokenType.Operator:
    case TokenType.ParamsOpen: switch (lexeme.type) {
      case LexemeType.Letter: return TokenType.Symbol;
    }
  }

  return TokenType.Unexpected
}

export function getTokens(lexemes: Array<Lexeme>): Token[] {
  const tokens: Token[] = [];

  let lastMeaningfullToken: TokenType = TokenType.BOF;
  let isLastWhitespace = true;
  
  let tokenPos = 0;
  let accumulator = "";
  
  let currentPos = 1;
  while (currentPos <= lexemes.length) {
    const currentType = getTokenType(lastMeaningfullToken, isLastWhitespace, lexemes[currentPos - 1]);
    const nextType: TokenType = currentPos != lexemes.length 
    ? getTokenType(isTokenMeaningfull(currentType) ? currentType : lastMeaningfullToken, (isTokenMeaningfull(currentType)), lexemes[currentPos])
    : TokenType.EOF;
    accumulator += lexemes[currentPos-1].value;
    
    if (currentType != nextType) {
      tokens.push({
        pos: tokenPos,
        type: currentType,
        text: accumulator
      });
      accumulator = "";
      tokenPos = currentPos;
      isLastWhitespace = !isTokenMeaningfull(currentType)
      if (!isLastWhitespace) lastMeaningfullToken = currentType;
    }

    currentPos += 1;
  };
  return tokens;
}