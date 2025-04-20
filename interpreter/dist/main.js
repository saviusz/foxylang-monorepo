"use strict";
/* import { Interpret } from "./Interpreter";
import Tokenizer from "./Tokenizer";

const input = `10 * 10.3`;

const tokenizer = new Tokenizer();

const tokens = tokenizer.tokenize(input);


console.log(tokens);
console.log(tokens.map(x => x.text).join(""));
console.log(Interpret(tokens)) */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrattParser_1 = require("./PrattParser");
const Tokenizer_1 = __importDefault(require("./Tokenizer"));
const tokenizer = new Tokenizer_1.default();
const tokens = tokenizer.tokenize("-1 + 3 * 6 + 17 - 36 / 5");
(0, PrattParser_1.Parse)(tokens);
