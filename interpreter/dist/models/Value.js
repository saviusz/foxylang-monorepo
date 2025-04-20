"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multiplication = exports.Subtraction = exports.Addition = exports.NumberValue = exports.TwoSidedOperation = void 0;
class TwoSidedOperation {
    left;
    right;
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}
exports.TwoSidedOperation = TwoSidedOperation;
class NumberValue {
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
exports.NumberValue = NumberValue;
class Addition extends TwoSidedOperation {
    atype = "add";
    getValue() {
        return this.left.getValue() + this.right.getValue();
    }
    getString() {
        return `(${this.left.getString()} + ${this.right.getString()})`;
    }
}
exports.Addition = Addition;
class Subtraction extends TwoSidedOperation {
    atype = "sub";
    getValue() {
        return this.left.getValue() - this.right.getValue();
    }
    getString() {
        return `(${this.left.getString()} - ${this.right.getString()})`;
    }
}
exports.Subtraction = Subtraction;
class Multiplication extends TwoSidedOperation {
    atype = "mul";
    getValue() {
        return this.left.getValue() * this.right.getValue();
    }
    getString() {
        return `(${this.left.getString()} * ${this.right.getString()})`;
    }
}
exports.Multiplication = Multiplication;
