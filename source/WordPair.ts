export class WordPair {

    private readonly word1: string
    private readonly word2: string
    private relatedBy: number

    constructor(word1: string, word2: string, relatedBy: number) {
        this.word1 = word1
        this.word2 = word2
        this.relatedBy = relatedBy
    }

    public equals(obj: WordPair): boolean {
        return this.word1 == obj.word1 && this.word2 == obj.word2
    }

    public getRelatedBy(): number{
        return this.relatedBy
    }

    public setRelatedBy(relatedBy: number){
        this.relatedBy = relatedBy
    }

    public getWord1(): string{
        return this.word1
    }

    public getWord2(): string{
        return this.word2
    }
}