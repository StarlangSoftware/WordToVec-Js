export class WordPair {

    private readonly word1: string
    private readonly word2: string
    private relatedBy: number

    /**
     * Constructor of the WordPair object. WordPair stores the information about two words and their similarity scores.
     * @param word1 First word
     * @param word2 Second word
     * @param relatedBy Similarity score between first and second word.
     */
    constructor(word1: string, word2: string, relatedBy: number) {
        this.word1 = word1
        this.word2 = word2
        this.relatedBy = relatedBy
    }

    public equals(obj: WordPair): boolean {
        return this.word1 == obj.word1 && this.word2 == obj.word2
    }

    /**
     * Accessor for the similarity score.
     * @return Similarity score.
     */
    public getRelatedBy(): number{
        return this.relatedBy
    }

    /**
     * Mutator for the similarity score.
     * @param relatedBy New similarity score
     */
    public setRelatedBy(relatedBy: number){
        this.relatedBy = relatedBy
    }

    /**
     * Accessor for the first word.
     * @return First word.
     */
    public getWord1(): string{
        return this.word1
    }

    /**
     * Accessor for the second word.
     * @return Second word.
     */
    public getWord2(): string{
        return this.word2
    }
}