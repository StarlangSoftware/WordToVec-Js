export declare class WordPair {
    private readonly word1;
    private readonly word2;
    private relatedBy;
    /**
     * Constructor of the WordPair object. WordPair stores the information about two words and their similarity scores.
     * @param word1 First word
     * @param word2 Second word
     * @param relatedBy Similarity score between first and second word.
     */
    constructor(word1: string, word2: string, relatedBy: number);
    equals(obj: WordPair): boolean;
    /**
     * Accessor for the similarity score.
     * @return Similarity score.
     */
    getRelatedBy(): number;
    /**
     * Mutator for the similarity score.
     * @param relatedBy New similarity score
     */
    setRelatedBy(relatedBy: number): void;
    /**
     * Accessor for the first word.
     * @return First word.
     */
    getWord1(): string;
    /**
     * Accessor for the second word.
     * @return Second word.
     */
    getWord2(): string;
}
