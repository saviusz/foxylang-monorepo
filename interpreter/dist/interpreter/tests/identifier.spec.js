"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASTTree_1 = require("../src/ASTTree");
const cases = [
    {
        input: "_variableName_",
        expected: new ASTTree_1.ASTIdentifier("_variableName_1234"),
        error: null
    },
    {
        input: "variableName",
        expected: new ASTTree_1.ASTIdentifier("variableName"),
        error: null
    },
    {
        input: "1234",
        expected: null,
        error: "Unexpected token"
    },
    {
        input: "",
        expected: null,
        error: "Unexpected token"
    }
];
describe('Identifier', () => {
    it.each(cases)('$input -> ${expected.toString()}', ({ input, expected, error }) => {
    });
});
//# sourceMappingURL=identifier.spec.js.map