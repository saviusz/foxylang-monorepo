import {Lexeme, LexemeType } from "./models/Lexeme";
import {Token, TokenType } from "./models/Token";

export default class Tokenizer {

  getGraph(char: string): Lexeme {
    if (char.length > 1) throw new Error("char should have length 1");

    if ("\n\r".includes(char[0])) return {
      type: LexemeType.NewLine,
      value: char
    }

    if ("\t ".includes(char[0])) return {
      type: LexemeType.Whitespace,
      value: char
    }

    switch (char[0]) {
      case "+":
        return {
          type: LexemeType.Plus,
          value: char
        }
      case "-":
        return {
          type: LexemeType.Minus,
          value: char
        }
      case "*":
        return {
          type: LexemeType.Star,
          value: char
        }
      case "/":
        return {
          type: LexemeType.FSlash,
          value: char
        }
      case "(":
        return {
          type: LexemeType.OParen,
          value: char
        }
      case ")":
        return {
          type: LexemeType.CParen,
          value: char
        }
      case ",":
        return {
          type: LexemeType.Comma,
          value: char
        }
      case "{":
        return {
          type: LexemeType.OCurly,
          value: char
        }
      case "}":
        return {
          type: LexemeType.CCurly,
          value: char
        }
      case "[":
        return {
          type: LexemeType.OSquere,
          value: char
        }
      case "]":
        return {
          type: LexemeType.CSquere,
          value: char
        }
      case ";":
        return {
          type: LexemeType.Semicolon,
          value: char
        }
      case "&":
        return {
          type: LexemeType.Amprestand,
          value: char
        }
      case "<":
        return {
          type: LexemeType.LessThan,
          value: char
        }
      case ">":
        return {
          type: LexemeType.MoreThan,
          value: char
        }
      case "=":
        return {
          type: LexemeType.Equal,
          value: char
        }
      
      
      
    }

    if ("1234567890".includes(char[0])) return {
      type: LexemeType.Digit,
      value: char
    }

    if ("abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ".includes(char[0])) return {
      type: LexemeType.Letter,
      value: char
    }

    return {
      type: LexemeType.Unknown,
      value: char
    }
  }

  private getTokenType(graphType: LexemeType, prevTokenType: TokenType): TokenType {

    if (graphType == LexemeType.Whitespace) return TokenType.Whitespace;

    switch (prevTokenType) {
      case TokenType.BOF:
        switch (graphType) {
          case LexemeType.Digit:
            return TokenType.Literal
        }
      case TokenType.Literal:
        switch (graphType) {
          case LexemeType.Digit:
            return TokenType.Literal
          case LexemeType.Plus:
          case LexemeType.Minus:
          case LexemeType.Star:
          case LexemeType.FSlash:
          case LexemeType.Comma:
            return TokenType.Operator
        }
      case TokenType.Operator:
        switch (graphType) {
          case LexemeType.Digit:
            return TokenType.Literal
          case LexemeType.Letter:
            return TokenType.Symbol
        }
      case TokenType.Symbol:
        switch (graphType) {
          case LexemeType.Letter:
            return TokenType.Symbol
        }
     
    }

    return TokenType.Unexpected
  }

  private getTokens(graphs: Lexeme[]): Token[] {
    const tokens: Token[] = [];

    let pos = 0;

    let prevActiveType = TokenType.BOF

    while (pos < graphs.length) {
      let _pos = pos;
      let groupedValue = "";
      let type;

      do {
        const graph = graphs[_pos]
        type = this.getTokenType(graph.type, prevActiveType)
        groupedValue += graph.value
        _pos += 1;
      } while (_pos < graphs.length && type == this.getTokenType(graphs[_pos].type, type))

      if (type != TokenType.Whitespace) {

        tokens.push({
          pos: pos,
          text: groupedValue,
          type: type
        })

        prevActiveType = type;
      }
      pos = _pos;
    };


    return tokens
  }

  tokenize(input: string): Token[] {
    const values = input.split("");
    const graphs = values.map(this.getGraph)
    const tokens = this.getTokens(graphs);
    return tokens
  }
}
