import { TokenType } from "./models/Token";
export function Parse(tokens) {
    console.table(tokens);
    const parser = new PrattParser(tokens);
    console.log(expr(parser).toString());
}
class PrattParser {
    tokens;
    constructor(input) {
        const _tokens = input.reverse();
        this.tokens = _tokens;
    }
    /**
     * Returns next token
     */
    next() {
        return this.tokens.pop() ?? { pos: 0, text: "", type: TokenType.EOF };
    }
    /**
     * Checks next token
     */
    peek() {
        return this.tokens.at(-1) ?? { pos: 0, text: "", type: TokenType.EOF };
    }
}
function expr(p) {
    const lhs = value(p);
    let operation = p.next();
    if (operation.type != TokenType.EOF) {
        const rhs = expr(p);
        return new BinaryOperation(operation.text, lhs, rhs);
    }
    return lhs;
}
function value(p) {
    const nextToken = p.next();
    switch (nextToken.type) {
        case TokenType.Literal:
            return new Literal(+nextToken.text);
        case TokenType.Symbol:
            return new Symbol(nextToken.text);
        default: throw new Error(`Token with type ${nextToken.type} is not a value`);
    }
}
class ASTEntry {
}
class Literal {
    _value;
    constructor(_value) {
        this._value = _value;
    }
    toString() {
        switch (typeof this._value) {
            case "string": return `"${this._value}"`;
            case "number": return `${this._value}`;
            case "bigint": return `${this._value}`;
            case "boolean": return this._value ? `true` : `false`;
            default: throw new Error("Unexpected type");
        }
    }
}
class Symbol {
    _name;
    constructor(_name) {
        this._name = _name;
    }
    toString() {
        return this._name;
    }
}
class BinaryOperation {
    _operator;
    lhs;
    rhs;
    constructor(_operator, lhs, rhs) {
        this._operator = _operator;
        this.lhs = lhs;
        this.rhs = rhs;
    }
    toString() {
        return `(${this._operator} ${this.lhs} ${this.rhs})`;
    }
}
//# sourceMappingURL=PrattParser.js.map