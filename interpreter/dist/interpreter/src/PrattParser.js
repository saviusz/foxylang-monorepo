"use strict";
// import { Token, TokenType } from "./models/Token";
Object.defineProperty(exports, "__esModule", { value: true });
// export function Parse(tokens: Token[]){
//     console.table(tokens);
//     const parser = new PrattParser(tokens);
//     console.log(expr(parser).toString())
// }
// class PrattParser {
//     tokens: Token[];
//     constructor(input: Token[]) {
//         const _tokens = input.reverse()
//         this.tokens = _tokens;
//     }
//     /**
//      * Returns next token
//      */
//     next(): Token {
//         return this.tokens.pop() ?? {pos: 0, text: "", type: TokenType.EOF}
//     }
//     /**
//      * Checks next token
//      */
//     peek(): Token {
//         return this.tokens.at(-1) ?? {pos: 0, text: "", type: TokenType.EOF}
//     }
// }
// function expr(p: PrattParser): Value {
//     const lhs = value(p);
//     let operation = p.next();
//     if (operation.type != TokenType.EOF){
//         const rhs = expr(p);
//         return new BinaryOperation(operation.text, lhs, rhs);
//     }
//     return lhs;
// }
// function value(p: PrattParser){
//     const nextToken = p.next()
//     switch(nextToken.type){
//         case TokenType.Literal:
//             return new Literal(+nextToken.text)
//         case TokenType.Symbol:
//             return new Symbol(nextToken.text)
//         default: throw new Error(`Token with type ${nextToken.type} is not a value`)
//     }
// }
// abstract class ASTEntry {
//     abstract toString(): string;
// }
// class Literal {
//     constructor(private _value: number){}
//     toString(){
//         switch (typeof this._value) {
//             case "string": return `"${this._value}"`
//             case "number": return `${this._value}`
//             case "bigint": return `${this._value}`
//             case "boolean": return this._value ? `true` : `false`
//             default: throw new Error("Unexpected type")
//         }
//     }
// }
// class Symbol {
//     constructor(private _name: string){}
//     toString(){
//         return this._name;
//     }
// }
// type Value = Literal | Symbol | BinaryOperation;
// class BinaryOperation {
//     constructor(private _operator: string, private lhs: Value, private rhs: Value){}
//     toString(){
//         return `(${this._operator} ${this.lhs} ${this.rhs})`
//     }
// }
//# sourceMappingURL=PrattParser.js.map