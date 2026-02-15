"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordPair = void 0;
class WordPair {
    word1;
    word2;
    relatedBy;
    /**
     * Constructor of the WordPair object. WordPair stores the information about two words and their similarity scores.
     * @param word1 First word
     * @param word2 Second word
     * @param relatedBy Similarity score between first and second word.
     */
    constructor(word1, word2, relatedBy) {
        this.word1 = word1;
        this.word2 = word2;
        this.relatedBy = relatedBy;
    }
    equals(obj) {
        return this.word1 == obj.word1 && this.word2 == obj.word2;
    }
    /**
     * Accessor for the similarity score.
     * @return Similarity score.
     */
    getRelatedBy() {
        return this.relatedBy;
    }
    /**
     * Mutator for the similarity score.
     * @param relatedBy New similarity score
     */
    setRelatedBy(relatedBy) {
        this.relatedBy = relatedBy;
    }
    /**
     * Accessor for the first word.
     * @return First word.
     */
    getWord1() {
        return this.word1;
    }
    /**
     * Accessor for the second word.
     * @return Second word.
     */
    getWord2() {
        return this.word2;
    }
}
exports.WordPair = WordPair;
//# sourceMappingURL=WordPair.js.map