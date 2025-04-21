export class TwoSidedOperation {
    left;
    right;
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}
export class NumberValue {
    value;
    atype = "num";
    constructor(value) {
        this.value = value;
    }
    getString() {
        return ` ${this.value} `;
    }
    getValue() {
        return this.value;
    }
}
export class Addition extends TwoSidedOperation {
    atype = "add";
    getValue() {
        return this.left.getValue() + this.right.getValue();
    }
    getString() {
        return `(${this.left.getString()} + ${this.right.getString()})`;
    }
}
export class Subtraction extends TwoSidedOperation {
    atype = "sub";
    getValue() {
        return this.left.getValue() - this.right.getValue();
    }
    getString() {
        return `(${this.left.getString()} - ${this.right.getString()})`;
    }
}
export class Multiplication extends TwoSidedOperation {
    atype = "mul";
    getValue() {
        return this.left.getValue() * this.right.getValue();
    }
    getString() {
        return `(${this.left.getString()} * ${this.right.getString()})`;
    }
}
//# sourceMappingURL=Value.js.map