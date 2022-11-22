export declare class WordPair {
    private readonly word1;
    private readonly word2;
    private relatedBy;
    constructor(word1: string, word2: string, relatedBy: number);
    equals(obj: WordPair): boolean;
    getRelatedBy(): number;
    setRelatedBy(relatedBy: number): void;
    getWord1(): string;
    getWord2(): string;
}
