import style from "./tokens-page.module.scss"
import { TokenData } from "../Models"
import clsx from "clsx";

interface Props {
  token: TokenData,
  onClick?: () => void
}
export default function TokenEntry({ token, onClick }: Props) {

  const text = token.value
    .replace(/[^a-zA-Z0-9\\_\[\](){}!@#$%^&*_+=-`~|<>,.:;'"?/]/g, (x) => `\\x${x.charCodeAt(0).toString(16).padStart(2, "0")}`)
    .replace("\\x20", "∙ (\\x20)")
    .replace("\\xa0", "⇥ (\\xA0)")
    .replace("\\x0a", "↵ (\\x0A)");

  return <div className={clsx(style.entry, token.isSelected && style.selected)} onClick={onClick}>
    <div className={style.value}>{text}</div>
    <div className={clsx(style.type, style[token.kind])}>{token.kind}</div>
    <div className={style.position}>{token.line}:{token.column}</div>
  </div>
}
