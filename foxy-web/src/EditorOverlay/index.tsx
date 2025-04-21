import { TokenData } from '../Models';
import DisplaySpan from './TokenSpan';
import style from './style.module.css';

interface Props {
  tokens: TokenData[];
}

export default function EditorOverlay(props: Props) {

  return <div className={style.container}>
    {props.tokens.map(token => <DisplaySpan token={token}/>)}
  </div>
}
