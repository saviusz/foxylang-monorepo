import { useState } from 'react';
import EditorOverlay from '../EditorOverlay';
import EditorTextArea from '../EditorTextArea';
import { TokenData } from '../Models';
import style from './Editor.module.css';

interface Props {
  tokens: TokenData[],
  onUpdate: (newValue: string) => void
}
function Editor({onUpdate, tokens}: Props) {
  const [text, setText] = useState("");

  const handleUpdate = (newText: string) => {
    setText(newText);
    onUpdate(newText);
  }

  return <div className={style.container}>
    <EditorTextArea onUpdate={handleUpdate} />
    <EditorOverlay text={text} tokens={tokens} />
  </div>
}

export default Editor