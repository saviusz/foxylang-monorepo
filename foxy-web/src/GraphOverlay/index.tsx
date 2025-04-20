import React from 'react'

import {Lexeme as Graph, LexemeType as GraphType} from "../../../interpreter/src/models/Lexeme";

import style from "./style.module.css";

interface Props {
  text: Graph[]
}

export default function GraphsOverlay(props: Props) {

  const getHue = (index: GraphType) => {
    const valueId = Object.values(GraphType).indexOf(index);
    const valuesNumber = Object.keys(GraphType).length;
    const colorId = valueId % 2 ? ((valueId + 1)/2-1) : (valueId / 2 + Math.ceil(valuesNumber / 2));
    return 360 / (valuesNumber) * colorId 
  }

  return (<>
    <div className={style.legend}>
      {Object.keys(GraphType).map(x => <span style={{ "--hue": getHue(GraphType[x as keyof typeof GraphType]) } as React.CSSProperties}>{x} </span>)}
    </div>
    <div className={style.container}>
      {props.text.map(g => <span className={style[g.type]} style={({ "--hue": getHue(g.type) } as React.CSSProperties)}>{g.value != " " ? g.value : "∙"}</span>)}
    </div>
  </>
  )
}
