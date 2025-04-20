export interface Value {
    getValue(): number;
    getString(): string;
}
export declare abstract class TwoSidedOperation implements Value {
    abstract getValue(): number;
    abstract getString(): string;
    left: Value;
    right: Value;
    constructor(left: Value, right: Value);
}
export declare class NumberValue implements Value {
    private value;
    atype: string;
    constructor(value: number);
    getString(): string;
    getValue(): number;
}
export declare class Addition extends TwoSidedOperation {
    atype: string;
    getValue(): number;
    getString(): string;
}
export declare class Subtraction extends TwoSidedOperation {
    atype: string;
    getValue(): number;
    getString(): string;
}
export declare class Multiplication extends TwoSidedOperation {
    atype: string;
    getValue(): number;
    getString(): string;
}
//# sourceMappingURL=Value.d.ts.map