import { TokenMarger } from "./token_marger";

import { it, describe, expect } from 'vitest';

describe('Token marger', () => {
    it("should merge identical tokens", () => {
        const converter = new TokenMarger();
        converter.reset("abcdef", [{
            kind: "comment", value: "abcdef", line: 1, column: 1,
            isSelected: false,
            key: "",
            start: 0,
            end: 6
        },
        {
            kind: "EOF", value: "", line: 1, column: 1,
            isSelected: false,
            key: "",
            start: 6,
            end: 6
        }
        ]);
        expect(converter.nextDisplayToken()).toMatchObject({ type: "comment", text: "abcdef", isSelected: false, start: 0, end: 6 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "EOF", text: "", isSelected: false, start: 6, end: 6 });
        expect(converter.nextDisplayToken()).toEqual(null);
    })

    it("should create display token at start", () => {
        const converter = new TokenMarger();
        converter.reset("abcdef", [
            {
                kind: "comment", value: "def", line: 1, column: 1,
                isSelected: false,
                key: "",
                start: 3,
                end: 6
            },
            {
                kind: "EOF", value: "", line: 1, column: 1,
                isSelected: false,
                key: "",
                start: 6,
                end: 6
            }
        ]);

        expect(converter.nextDisplayToken()).toMatchObject({ type: "invisible", text: "abc", isSelected: false, start: 0, end: 3 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "comment", text: "def", isSelected: false, start: 3, end: 6 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "EOF", text: "", isSelected: false, start: 6, end: 6 });
        expect(converter.nextDisplayToken()).toEqual(null);
    })

    it("should create display token at end", () => {
        const converter = new TokenMarger();
        converter.reset("abcdef", [{
            kind: "comment", value: "abc", line: 1, column: 1,
            isSelected: false,
            key: "",
            start: 0,
            end: 3
        },
        {
            kind: "EOF", value: "", line: 1, column: 1,
            isSelected: false,
            key: "",
            start: 6,
            end: 6
        }
        ]);
        expect(converter.nextDisplayToken()).toMatchObject({ type: "comment", text: "abc", isSelected: false, start: 0, end: 3 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "invisible", text: "def", isSelected: false, start: 3, end: 6 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "EOF", text: "", isSelected: false, start: 6, end: 6 });
        expect(converter.nextDisplayToken()).toEqual(null);
    })

    it("should marge missmatched tokens", () => {
        const converter = new TokenMarger();
        converter.reset("abcdef", [{
            kind: "comment", value: "cxe", line: 1, column: 2,
            isSelected: false,
            key: "",
            start: 2,
            end: 5
        },
        {
            kind: "EOF", value: "", line: 1, column: 1,
            isSelected: false,
            key: "",
            start: 6,
            end: 6
        }
        ]);

        expect(converter.nextDisplayToken()).toMatchObject({ type: "invisible", text: "ab", isSelected: false, start: 0, end: 2 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "comment", text: "cxe", isSelected: false, start: 2, end: 5 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "invisible", text: "f", isSelected: false, start: 5, end: 6 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "EOF", text: "", isSelected: false, start: 6, end: 6 });
        expect(converter.nextDisplayToken()).toEqual(null);
    });

    it("should use token longer extending over the text", () => {
        const converter = new TokenMarger();
        converter.reset("abcdef", [
            {
                kind: "comment", value: "defghi", line: 1, column: 1,
                isSelected: false,
                key: "",
                start: 3,
                end: 9
            },
            {
                kind: "EOF", value: "", line: 1, column: 1,
                isSelected: false,
                key: "",
                start: 9,
                end: 9
            }
        ]);

        expect(converter.nextDisplayToken()).toMatchObject({ type: "invisible", text: "abc", isSelected: false, start: 0, end: 3 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "comment", text: "defghi", isSelected: false, start: 3, end: 9 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "EOF", text: "", isSelected: false, start: 9, end: 9 });
        expect(converter.nextDisplayToken()).toEqual(null);
    })

    it("should create display token before token much after text", () => {
        const converter = new TokenMarger();
        converter.reset("abcdef", [
            {
                kind: "comment", value: "hij", line: 1, column: 4,
                isSelected: false,
                key: "",
                start: 7,
                end: 10
            },
            {
                kind: "EOF", value: "", line: 1, column: 1,
                isSelected: false,
                key: "",
                start: 10,
                end: 10
            }]);
        expect(converter.nextDisplayToken()).toMatchObject({ type: "invisible", text: "abcdef", isSelected: false, start: 0, end: 6 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "comment", text: "hij", isSelected: false, position: 7 });
        expect(converter.nextDisplayToken()).toMatchObject({ type: "EOF", text: "", isSelected: false, position: 10 });
        expect(converter.nextDisplayToken()).toEqual(null);
    });

})