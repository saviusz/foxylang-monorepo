export abstract class ASTNode {
    abstract toString(): string;
    toObject(): Record<string, any> {
        return {
            category: this.category
        };
    };
    abstract category: string;
}

export class ASTIdentifier extends ASTNode {
    category = "identifier"
    constructor(public identifier: string) {
        super();
    }
    toString(): string {
        return this.identifier;
    }

    toObject(): Record<string, any> {
        return {
            ...super.toObject(),
            identifier: this.identifier
        }
    }
}