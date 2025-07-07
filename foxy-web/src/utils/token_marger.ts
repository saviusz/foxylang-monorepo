import { TokenData } from "../Models";

interface DisplayToken {
    text: string;
    type: string;
    isSelected: boolean;
}

export class TokenMarger {

    charNum: number = 0;
    tokenNum: number = 0;

    textInput: string = "";
    tokenInput: TokenData[] = [];
    tokens: DisplayToken[] = [];

    generate(textInput: string, tokenInput: TokenData[]) {
        this.reset(textInput, tokenInput);

        let displayToken = this.nextDisplayToken();

        console.log("generate: before loop");
        let safeGuard = 0;
        while (displayToken != null) {
            this.tokens.push(displayToken);
            displayToken = this.nextDisplayToken();
            safeGuard += 1;
            if (safeGuard > 500) break;
        }
        console.log("generate: after loop");

        return this.tokens;
    }

    reset(textInput: string, tokenInput: TokenData[]) {
        this.textInput = textInput;
        this.tokenInput = tokenInput;
        this.charNum = 0;
        this.tokenNum = 0;
        this.tokens = [];
    }

    consumeChar() {
        this.charNum += 1;
        return this.textInput.charAt(this.charNum - 1);
    }

    lookupChar() {
        return this.textInput.charAt(this.charNum);
    }

    consumeCurrentToken() {
        return this.tokenInput[this.tokenNum];
    }

    lookupToken() {
        return this.tokenInput[this.tokenNum + 1];
    }

    nextToken() {
        this.tokenNum += 1;
        return this.tokenInput[this.tokenNum];
    }

    nextDisplayToken() {
        // TODO: split this into separate functions: parseInvisibleToken and parseToken
        
        const currentToken = this.consumeCurrentToken();
        if (!currentToken) return null;
        
        const invisibleToken = this.consumeInvisibleToken(currentToken);
        if (invisibleToken) return invisibleToken;

        return this.consumeVisibleToken(currentToken);
    }


    private consumeInvisibleToken(currentToken: TokenData) {
        let text = "";

        let tokenCharNum = 0;
        const startPos = this.charNum;

        let y = 0;
        while (y < 100 &&
            this.charNum < currentToken.start
            && this.lookupChar() != currentToken.value.charAt(tokenCharNum)) {
            y++;
            text += this.consumeChar();
            tokenCharNum += 1;
        }
        if (text.length > 0) return {
            text: text,
            type: "invisible",
            isSelected: false,
            position: startPos,
            key: "invisible" + startPos,
        };
        return null;
    }

    private consumeVisibleToken(currentToken: TokenData) {
        let tokenCharNum = 0;
        let text = "";
        let z = 0;
        while (z < 100 &&
            this.charNum < currentToken.start + currentToken.value.length) {
            z++;
            if (this.lookupChar() == currentToken.value.charAt(tokenCharNum)) {
                text += this.consumeChar();
            } else {
                this.consumeChar();
                text += currentToken.value.charAt(tokenCharNum);
            }
            tokenCharNum += 1;
        }
        this.nextToken();
        return {
            text: text,
            type: currentToken.kind,
            isSelected: currentToken.isSelected,
            position: currentToken.start
        };
    }
}