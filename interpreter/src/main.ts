/* import { Interpret } from "./Interpreter";
import Tokenizer from "./Tokenizer";

const input = `10 * 10.3`;

const tokenizer = new Tokenizer();

const tokens = tokenizer.tokenize(input);


console.log(tokens);
console.log(tokens.map(x => x.text).join(""));
console.log(Interpret(tokens)) */

import { Parse } from "./PrattParser";
import Tokenizer from "./Tokenizer";

const tokenizer = new Tokenizer();

const tokens = tokenizer.tokenize("-1 + 3 * 6 + 17 - 36 / 5");
Parse(tokens)