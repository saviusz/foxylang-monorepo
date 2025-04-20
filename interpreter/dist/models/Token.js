"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
exports.isTokenMeaningfull = isTokenMeaningfull;
exports.getTokenType = getTokenType;
exports.getTokens = getTokens;
const Lexeme_1 = require("./Lexeme");
var TokenType;
(function (TokenType) {
    TokenType["Unexpected"] = "Unknown";
    TokenType["Whitespace"] = "Whitespace";
    TokenType["Literal"] = "Literal";
    TokenType["Operator"] = "Operator";
    TokenType["Symbol"] = "Symbol";
    TokenType["BOF"] = "BOF";
    TokenType["EOF"] = "EOF";
    TokenType["EOL"] = "EOL";
    TokenType["Comment"] = "Comment";
    TokenType["LineComment"] = "LineComment";
    TokenType["BlockComment"] = "BlockComment";
    TokenType["ParamsOpen"] = "ParamsOpen";
    TokenType["GenericOpen"] = "GenericOpen";
})(TokenType || (exports.TokenType = TokenType = {}));
function isTokenMeaningfull(tokenType) {
    return tokenType != TokenType.Whitespace && tokenType != TokenType.EOL;
}
function getTokenType(lastMeaningfullToken, isSpacePreceeded, lexeme) {
    switch (lexeme.type) {
        case Lexeme_1.LexemeType.Whitespace: return TokenType.Whitespace;
        case Lexeme_1.LexemeType.NewLine: return TokenType.EOL;
        case Lexeme_1.LexemeType.Star:
        case Lexeme_1.LexemeType.FSlash:
            return TokenType.Operator;
    }
    switch (lastMeaningfullToken) {
        case TokenType.BOF: switch (lexeme.type) {
            case Lexeme_1.LexemeType.Letter: return TokenType.Symbol;
        }
        case TokenType.Symbol: switch (lexeme.type) {
            case Lexeme_1.LexemeType.Letter:
            case Lexeme_1.LexemeType.Digit: return TokenType.Symbol;
            case Lexeme_1.LexemeType.OParen: return TokenType.ParamsOpen;
            case Lexeme_1.LexemeType.Comma: return TokenType.Operator;
            case Lexeme_1.LexemeType.LessThan: return isSpacePreceeded ? TokenType.Operator : TokenType.GenericOpen;
        }
        case TokenType.Operator:
        case TokenType.ParamsOpen: switch (lexeme.type) {
            case Lexeme_1.LexemeType.Letter: return TokenType.Symbol;
        }
    }
    return TokenType.Unexpected;
}
function getTokens(lexemes) {
    const tokens = [];
    let lastMeaningfullToken = TokenType.BOF;
    let isLastWhitespace = true;
    let tokenPos = 0;
    let accumulator = "";
    let currentPos = 1;
    while (currentPos <= lexemes.length) {
        const currentType = getTokenType(lastMeaningfullToken, isLastWhitespace, lexemes[currentPos - 1]);
        const nextType = currentPos != lexemes.length
            ? getTokenType(isTokenMeaningfull(currentType) ? currentType : lastMeaningfullToken, (isTokenMeaningfull(currentType)), lexemes[currentPos])
            : TokenType.EOF;
        accumulator += lexemes[currentPos - 1].value;
        if (currentType != nextType) {
            tokens.push({
                pos: tokenPos,
                type: currentType,
                text: accumulator
            });
            accumulator = "";
            tokenPos = currentPos;
            isLastWhitespace = !isTokenMeaningfull(currentType);
            if (!isLastWhitespace)
                lastMeaningfullToken = currentType;
        }
        currentPos += 1;
    }
    ;
    return tokens;
}
