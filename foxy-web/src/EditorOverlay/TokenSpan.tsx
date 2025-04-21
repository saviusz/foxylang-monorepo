import clsx from "clsx";
import style from "./style.module.css";
import { TokenData } from "../Models";

interface Props {
    token: TokenData
}
export default function DisplaySpan({ token }: Props) {
    const _text = token.value
    .replace(" ", "∙")
    .replace("\t", "⇥⇥⇥⇥")
    .replace("\n", "↵\n");
    

    return <span className={clsx(style.span,token.isSelected && style.highlighted, style[token.type])}>{_text}</span>
}
