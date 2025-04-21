import EditorOverlay from '../EditorOverlay';
import EditorTextArea from '../EditorTextArea';
import { TokenData } from '../Models';
import style from './Editor.module.css';

interface Props {
  tokens: TokenData[],
  onUpdate: (newValue: string) => void
}
function Editor({onUpdate, tokens}: Props) {
  return <div className={style.container}>
    <EditorTextArea onUpdate={x => onUpdate(x)} />
    <EditorOverlay tokens={tokens} />
  </div>
}

export default Editor