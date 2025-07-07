import { Lexeme } from "@saviusz/foxylang-tokenizer";

export interface TokenData extends Lexeme {
    isSelected: boolean,
    key: string
}