export declare abstract class ASTNode {
    abstract toString(): string;
    toObject(): Record<string, any>;
    abstract category: string;
}
export declare class ASTIdentifier extends ASTNode {
    identifier: string;
    category: string;
    constructor(identifier: string);
    toString(): string;
    toObject(): Record<string, any>;
}
//# sourceMappingURL=ASTTree.d.ts.map