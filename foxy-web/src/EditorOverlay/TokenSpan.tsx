import clsx from "clsx";
import style from "./style.module.css";

interface Props {
    isSelected: boolean;
    tokenType: string;
    text: string;
}
export default function DisplaySpan({ isSelected, tokenType, text }: Props) {    
    return <span className={clsx(style.span, isSelected && style.highlighted, style[tokenType])}>{text}</span>
}
