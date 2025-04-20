import React from 'react'

import { Token, TokenType } from "../../../interpreter/src/models/Token";

import style from "./style.module.css";

interface Props {
  text: Token[]
}

export default function TokensOverlay(props: Props) {

  let i = 0

  const getHue = (index: TokenType) => {
    return (360 / Object.keys(TokenType).length) * Object.values(TokenType).indexOf(index)
  }

  return (<>
    <div className={style.legend}>
      {Object.keys(TokenType).map(x => <span style={{ "--hue": getHue(TokenType[x as keyof typeof TokenType]) } as React.CSSProperties}>{x} </span>)}
    </div>
    <div className={style.container}>
      {props.text.map(token => {
        const spaces = token.pos - i;
        i = token.pos + token.text.length;
        return <>
          <span>{" ".repeat(spaces)}</span>
          <span style={({ "--hue": getHue(token.type) } as React.CSSProperties)}>{token.text}</span>
        </>
      })}
    </div>
  </>
  )
}
