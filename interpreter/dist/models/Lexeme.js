"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexemeType = void 0;
exports.getLexemeType = getLexemeType;
exports.getLexeme = getLexeme;
var LexemeType;
(function (LexemeType) {
    LexemeType["Unknown"] = "Unknown";
    LexemeType["Whitespace"] = "Whitespace";
    LexemeType["NewLine"] = "Newline";
    LexemeType["Letter"] = "Letter";
    LexemeType["Digit"] = "Digit";
    LexemeType["Plus"] = "Plus";
    LexemeType["Minus"] = "Minus";
    LexemeType["Star"] = "Star";
    LexemeType["Comma"] = "Comma";
    LexemeType["Question"] = "Question";
    LexemeType["Semicolon"] = "Semicolon";
    LexemeType["FSlash"] = "Fslash";
    LexemeType["OParen"] = "OParen";
    LexemeType["CParen"] = "CParen";
    LexemeType["OCurly"] = "OCurly";
    LexemeType["CCurly"] = "CCurly";
    LexemeType["OSquere"] = "OSquere";
    LexemeType["CSquere"] = "CSquere";
    LexemeType["LessThan"] = "LessThan";
    LexemeType["MoreThan"] = "MoreThan";
    LexemeType["Amprestand"] = "Amprestand";
    LexemeType["Equal"] = "Equal";
    LexemeType["Exclaim"] = "Exclaim";
    LexemeType["Dot"] = "Dot";
    LexemeType["Colon"] = "Colon";
    LexemeType["At"] = "At";
    LexemeType["Hash"] = "Hash";
    LexemeType["Tilde"] = "Tilde";
    LexemeType["Pipe"] = "Pipe";
    LexemeType["BSlash"] = "BSlash";
    LexemeType["Accent"] = "Accent";
    LexemeType["Quote"] = "Quote";
    LexemeType["Aqute"] = "Aqute";
    LexemeType["Dash"] = "Dash";
})(LexemeType || (exports.LexemeType = LexemeType = {}));
function getLexemeType(char) {
    if (char.length != 1)
        throw new Error(`Wrong length of char ${char.length}`);
    if ('1234567890'.includes(char))
        return LexemeType.Digit;
    if (`\r\n`.includes(char))
        return LexemeType.NewLine;
    if (`\t `.includes(char))
        return LexemeType.Whitespace;
    if ('abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ'.includes(char))
        return LexemeType.Letter;
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
function getLexeme(char) {
    return {
        type: getLexemeType(char),
        value: char
    };
}
