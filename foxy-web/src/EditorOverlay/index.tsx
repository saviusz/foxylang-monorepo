import { TokenData } from '../Models';
import { TokenMarger } from '../utils/token_marger';
import DisplaySpan from './TokenSpan';
import style from './style.module.css';

interface Props {
  tokens: TokenData[];
  text: string;
}

export default function EditorOverlay(props: Props) {

  const converter = new TokenMarger();
  const spans = converter.generate(props.text, props.tokens);
  return <div className={style.container}>
    {spans.map((x, i) => <DisplaySpan key={i} tokenType={x.type} text={x.text} isSelected={x.isSelected} />)}
  </div>
}
