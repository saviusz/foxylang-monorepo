import React from 'react'

import style from "./style.module.css";

interface Props{
    onChangeGraphs: (value: boolean) => void;
    onChangeTokens: (value: boolean) => void;
}

export default function SettingsMenu(props : Props) {
  return (
    <div className={style.container}>
        <label>Graphs: <input type="checkbox" onChange={(e) => props.onChangeGraphs(e.target.checked)}/></label><br />
        <label>Tokens: <input type="checkbox" onChange={(e) => props.onChangeTokens(e.target.checked)}/></label>
    </div>
  )
}
