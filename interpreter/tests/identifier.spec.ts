import { Lexeme } from "@saviusz/foxylang-tokenizer/index";
import { ASTIdentifier } from "../src/ASTTree";

const cases: { input: string, expected: any, error: any }[] = [
    {
        input: "_variableName_",
        expected: new ASTIdentifier("_variableName_1234"),
        error: null
    },
    {
        input: "variableName",
        expected: new ASTIdentifier("variableName"),
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
]
describe('Identifier', () => {
    it.each(cases)('$input -> ${expected.toString()}', ({ input, expected, error }) => {

    })
})