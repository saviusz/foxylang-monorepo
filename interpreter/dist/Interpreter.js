import { TokenType } from "./models/Token";
import { Addition, Multiplication, NumberValue, Subtraction } from "./models/Value";
export function Interpret(tokens) {
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
            case TokenType.Literal:
                stack.push(new NumberValue(+token.text));
                break;
            case TokenType.Operator:
                operation = token.text;
                break;
            case TokenType.GroupO:
                let depth = 0;
                const closing = tokens.findIndex((tok, ind) => {
                    if (ind <= index)
                        return false;
                    if (tok.type == TokenType.GroupO) {
                        depth += 1;
                        return false;
                    }
                    if (tok.type == TokenType.GroupC) {
                        if (depth == 0)
                            return true;
                        depth -= 1;
                    }
                });
                stack.push(GenSyntaxTree(tokens.slice(index + 1, closing)));
                index = closing;
                break;
            case TokenType.GroupC:
                operation = "";
                break;
        }
        switch (operation) {
            case "+":
                if (stack.length >= 2) {
                    let right = stack.pop(), left = stack.pop();
                    stack.push(new Addition(left, right));
                    operation = "";
                }
                break;
            case "-":
                if (stack.length >= 2) {
                    let right = stack.pop(), left = stack.pop();
                    stack.push(new Subtraction(left, right));
                    operation = "";
                }
                break;
            case "*":
                if (stack.length >= 2) {
                    let right = stack.pop(), left = stack.pop();
                    stack.push(new Multiplication(left, right));
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
//# sourceMappingURL=Interpreter.js.map