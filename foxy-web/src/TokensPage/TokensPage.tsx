import { TokenData } from "../Models";
import TokenEntry from "./TokenEntry";
import style from "./tokens-page.module.scss";

interface Props {
    tokens: TokenData[],
    onTokenSelection?: (tokenKey: string) => void
}
export default function TokensPage({ tokens, onTokenSelection = () => {} }: Props) {

    return <div className={style.container}>
        {tokens.map(token => <TokenEntry key={token.key} token={token} onClick={() => onTokenSelection(token.key)}/>)}
    </div>
}
