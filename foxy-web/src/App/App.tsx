import { useState } from 'react';

import './App.css'
import Editor from '../Editor'
import GraphsOverlay from '../GraphOverlay';

import Tokenizer from "../../../interpreter/src/Tokenizer";
import TokensOverlay from '../TokensOverlay';
import SettingsMenu from '../SettingsMenu';
import { getLexeme } from '../../../interpreter/src/models/Lexeme';
import { getTokens } from '../../../interpreter/src/models/Token';

const tokenizer = new Tokenizer();

function App() {
  const [text, setText] = useState("Pisz tutaj");
  const [tokensVisibility, setTokensVisibility] = useState(false);
  const [graphsVisibility, setGraphsVisibility] = useState(false);

  const lexemes = text.split("").map(x => getLexeme(x));
  const tokens = getTokens(lexemes);

  console.log("Tokens:", tokens);

  return (
    <div className='wrapper'>
      <SettingsMenu onChangeTokens={setTokensVisibility} onChangeGraphs={setGraphsVisibility} />
      <Editor onUpdate={setText} />
      {graphsVisibility &&
        <GraphsOverlay text={lexemes} />}
      {tokensVisibility &&
        <TokensOverlay text={tokens} />
      }
    </div>
  )
}

export default App
