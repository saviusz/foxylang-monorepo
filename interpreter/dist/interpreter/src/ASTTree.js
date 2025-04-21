"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTIdentifier = exports.ASTNode = void 0;
class ASTNode {
    toObject() {
        return {
            category: this.category
        };
    }
    ;
}
exports.ASTNode = ASTNode;
class ASTIdentifier extends ASTNode {
    identifier;
    category = "identifier";
    constructor(identifier) {
        super();
        this.identifier = identifier;
    }
    toString() {
        return this.identifier;
    }
    toObject() {
        return {
            ...super.toObject(),
            identifier: this.identifier
        };
    }
}
exports.ASTIdentifier = ASTIdentifier;
//# sourceMappingURL=ASTTree.js.map