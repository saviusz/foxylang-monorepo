export interface Value {
    getValue() : number;
    getString() : string;
}

export abstract class TwoSidedOperation implements Value {
    abstract getValue(): number;
    abstract getString(): string;
    left: Value;
    right: Value;

    constructor(left: Value, right: Value){
        this.left = left 
        this.right = right
    }
}

export class NumberValue implements Value {
    atype = "num"
    constructor(private value : number){}
    getString(): string {
        return ` ${this.value} `
    }
    getValue(): number {
        return this.value;
    }
}

export class Addition extends TwoSidedOperation {
    
    atype = "add"
    
    getValue(): number {
        return this.left.getValue() + this.right.getValue()
    }

    getString(): string {
        return `(${this.left.getString()} + ${this.right.getString()})`
    }
}

export class Subtraction extends TwoSidedOperation {
    atype = "sub"
    getValue(): number {
        return this.left.getValue() - this.right.getValue()
    }

    getString(): string {
        return `(${this.left.getString()} - ${this.right.getString()})`
    }
}

export class Multiplication extends TwoSidedOperation {
    atype = "mul"
    getValue(): number {
        return this.left.getValue() * this.right.getValue()
    }

    getString(): string {
        return `(${this.left.getString()} * ${this.right.getString()})`
    }
}

