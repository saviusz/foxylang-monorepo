import style from "./style.module.css";

interface Props {
    onUpdate: (newValue: string) => void;
}

export default function EditorTextArea(props: Props) {
    return (
        <div
        className={style.container} 
        contentEditable="plaintext-only"
        suppressContentEditableWarning={true} onInput={x => props.onUpdate(x.currentTarget.innerText)}>
            Pisz tutaj
        </div>
    )
}
