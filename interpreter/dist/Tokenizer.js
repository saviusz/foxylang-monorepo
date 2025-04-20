"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lexeme_1 = require("./models/Lexeme");
const Token_1 = require("./models/Token");
class Tokenizer {
    getGraph(char) {
        if (char.length > 1)
            throw new Error("char should have length 1");
        if ("\n\r".includes(char[0]))
            return {
                type: Lexeme_1.LexemeType.NewLine,
                value: char
            };
        if ("\t ".includes(char[0]))
            return {
                type: Lexeme_1.LexemeType.Whitespace,
                value: char
            };
        switch (char[0]) {
            case "+":
                return {
                    type: Lexeme_1.LexemeType.Plus,
                    value: char
                };
            case "-":
                return {
                    type: Lexeme_1.LexemeType.Minus,
                    value: char
                };
            case "*":
                return {
                    type: Lexeme_1.LexemeType.Star,
                    value: char
                };
            case "/":
                return {
                    type: Lexeme_1.LexemeType.FSlash,
                    value: char
                };
            case "(":
                return {
                    type: Lexeme_1.LexemeType.OParen,
                    value: char
                };
            case ")":
                return {
                    type: Lexeme_1.LexemeType.CParen,
                    value: char
                };
            case ",":
                return {
                    type: Lexeme_1.LexemeType.Comma,
                    value: char
                };
            case "{":
                return {
                    type: Lexeme_1.LexemeType.OCurly,
                    value: char
                };
            case "}":
                return {
                    type: Lexeme_1.LexemeType.CCurly,
                    value: char
                };
            case "[":
                return {
                    type: Lexeme_1.LexemeType.OSquere,
                    value: char
                };
            case "]":
                return {
                    type: Lexeme_1.LexemeType.CSquere,
                    value: char
                };
            case ";":
                return {
                    type: Lexeme_1.LexemeType.Semicolon,
                    value: char
                };
            case "&":
                return {
                    type: Lexeme_1.LexemeType.Amprestand,
                    value: char
                };
            case "<":
                return {
                    type: Lexeme_1.LexemeType.LessThan,
                    value: char
                };
            case ">":
                return {
                    type: Lexeme_1.LexemeType.MoreThan,
                    value: char
                };
            case "=":
                return {
                    type: Lexeme_1.LexemeType.Equal,
                    value: char
                };
        }
        if ("1234567890".includes(char[0]))
            return {
                type: Lexeme_1.LexemeType.Digit,
                value: char
            };
        if ("abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ".includes(char[0]))
            return {
                type: Lexeme_1.LexemeType.Letter,
                value: char
            };
        return {
            type: Lexeme_1.LexemeType.Unknown,
            value: char
        };
    }
    getTokenType(graphType, prevTokenType) {
        if (graphType == Lexeme_1.LexemeType.Whitespace)
            return Token_1.TokenType.Whitespace;
        switch (prevTokenType) {
            case Token_1.TokenType.BOF:
                switch (graphType) {
                    case Lexeme_1.LexemeType.Digit:
                        return Token_1.TokenType.Literal;
                }
            case Token_1.TokenType.Literal:
                switch (graphType) {
                    case Lexeme_1.LexemeType.Digit:
                        return Token_1.TokenType.Literal;
                    case Lexeme_1.LexemeType.Plus:
                    case Lexeme_1.LexemeType.Minus:
                    case Lexeme_1.LexemeType.Star:
                    case Lexeme_1.LexemeType.FSlash:
                    case Lexeme_1.LexemeType.Comma:
                        return Token_1.TokenType.Operator;
                }
            case Token_1.TokenType.Operator:
                switch (graphType) {
                    case Lexeme_1.LexemeType.Digit:
                        return Token_1.TokenType.Literal;
                    case Lexeme_1.LexemeType.Letter:
                        return Token_1.TokenType.Symbol;
                }
            case Token_1.TokenType.Symbol:
                switch (graphType) {
                    case Lexeme_1.LexemeType.Letter:
                        return Token_1.TokenType.Symbol;
                }
        }
        return Token_1.TokenType.Unexpected;
    }
    getTokens(graphs) {
        const tokens = [];
        let pos = 0;
        let prevActiveType = Token_1.TokenType.BOF;
        while (pos < graphs.length) {
            let _pos = pos;
            let groupedValue = "";
            let type;
            do {
                const graph = graphs[_pos];
                type = this.getTokenType(graph.type, prevActiveType);
                groupedValue += graph.value;
                _pos += 1;
            } while (_pos < graphs.length && type == this.getTokenType(graphs[_pos].type, type));
            if (type != Token_1.TokenType.Whitespace) {
                tokens.push({
                    pos: pos,
                    text: groupedValue,
                    type: type
                });
                prevActiveType = type;
            }
            pos = _pos;
        }
        ;
        return tokens;
    }
    tokenize(input) {
        const values = input.split("");
        const graphs = values.map(this.getGraph);
        const tokens = this.getTokens(graphs);
        return tokens;
    }
}
exports.default = Tokenizer;
