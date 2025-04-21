import style from './App.module.css'

import { Suspense, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import TokensPage from '../TokensPage/TokensPage'
import Editor from '../Editor/Editor'
import { Tokenizer } from '@saviusz/foxylang-tokenizer/index'
import { TokenData } from '../Models'


const tokenizer = new Tokenizer();

function App() {
  const [tokens, setTokens] = useState<TokenData[]>([]);

  const handleInput = (text: string) => {
    const tokens = tokenizer.tokenize(text).map(x => ({ ...x, isSelected: false, key: x.value + x.type + x.column + x.line }));
    setTokens(tokens);
  }

  const handleTokenSelection = (tokenKey: string) => {
    setTokens(tokens.map(x => ({ ...x, isSelected: x.key === tokenKey ? !x.isSelected : false })));
  }

  return <div className={style.wrapper}>
    <div className={style.left}>
      <Editor onUpdate={handleInput} tokens={tokens} />
    </div>
    <div className={style.right}>
      <Tabs className={style.tabs} selectedTabPanelClassName={style.selectedPanel}>
        <TabList className={style.tabList}>
          <Tab>Tokeny</Tab>
          <Tab>Drzewo</Tab>
        </TabList>

        <TabPanel>
          <Suspense fallback={<div>Ładowanie...</div>}>
            <TokensPage tokens={tokens} onTokenSelection={handleTokenSelection} />
          </Suspense>
        </TabPanel>

        <TabPanel>
          {"drzewo"}
        </TabPanel>
      </Tabs>
    </div>
  </div>
}

export default App
