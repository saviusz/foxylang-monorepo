import { LexemeType } from "./Lexeme";
export var TokenType;
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
})(TokenType || (TokenType = {}));
export function isTokenMeaningfull(tokenType) {
    return tokenType != TokenType.Whitespace && tokenType != TokenType.EOL;
}
export function getTokenType(lastMeaningfullToken, isSpacePreceeded, lexeme) {
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
    return TokenType.Unexpected;
}
export function getTokens(lexemes) {
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
//# sourceMappingURL=Token.js.map