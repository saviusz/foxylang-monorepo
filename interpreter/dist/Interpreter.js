"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpret = Interpret;
const Token_1 = require("./models/Token");
const Value_1 = require("./models/Value");
function Interpret(tokens) {
    const tree = GenSyntaxTree(tokens);
    console.log(tree.getString());
    return tree.getValue();
}
function GenSyntaxTree(tokens) {
    const stack = [];
    let operation = "";
    console.log("Weszło", tokens, operation, stack);
    for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index];
        console.log(`${index} ${token.text} ${operation}`);
        switch (token.type) {
            case Token_1.TokenType.Literal:
                stack.push(new Value_1.NumberValue(+token.text));
                break;
            case Token_1.TokenType.Operator:
                operation = token.text;
                break;
            case Token_1.TokenType.GroupO:
                let depth = 0;
                const closing = tokens.findIndex((tok, ind) => {
                    if (ind <= index)
                        return false;
                    if (tok.type == Token_1.TokenType.GroupO) {
                        depth += 1;
                        return false;
                    }
                    if (tok.type == Token_1.TokenType.GroupC) {
                        if (depth == 0)
                            return true;
                        depth -= 1;
                    }
                });
                stack.push(GenSyntaxTree(tokens.slice(index + 1, closing)));
                index = closing;
                break;
            case Token_1.TokenType.GroupC:
                operation = "";
                break;
        }
        switch (operation) {
            case "+":
                if (stack.length >= 2) {
                    let right = stack.pop(), left = stack.pop();
                    stack.push(new Value_1.Addition(left, right));
                    operation = "";
                }
                break;
            case "-":
                if (stack.length >= 2) {
                    let right = stack.pop(), left = stack.pop();
                    stack.push(new Value_1.Subtraction(left, right));
                    operation = "";
                }
                break;
            case "*":
                if (stack.length >= 2) {
                    let right = stack.pop(), left = stack.pop();
                    stack.push(new Value_1.Multiplication(left, right));
                    operation = "";
                }
                break;
        }
        console.log(stack);
    }
    if (operation != "")
        throw new Error("Unmached operation");
    return stack[0];
}
