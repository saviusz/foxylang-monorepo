import { Lexeme } from "@saviusz/foxylang-tokenizer/index";

export interface TokenData extends Lexeme {
    isSelected: boolean,
    key: string
}