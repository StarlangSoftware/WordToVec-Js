(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Iteration = void 0;
    class Iteration {
        /**
         * Constructor for the {@link Iteration} class. Get corpus and parameter as input, sets the corresponding
         * parameters.
         * @param corpus Corpus used to train word vectors using Word2Vec algorithm.
         * @param wordToVecParameter Parameters of the Word2Vec algorithm.
         */
        constructor(corpus, wordToVecParameter) {
            this.wordCount = 0;
            this.lastWordCount = 0;
            this.wordCountActual = 0;
            this.iterationCount = 0;
            this.sentencePosition = 0;
            this.sentenceIndex = 0;
            this.corpus = corpus;
            this.wordToVecParameter = wordToVecParameter;
            this.startingAlpha = wordToVecParameter.getAlpha();
            this.alpha = wordToVecParameter.getAlpha();
        }
        /**
         * Accessor for the alpha attribute.
         * @return Alpha attribute.
         */
        getAlpha() {
            return this.alpha;
        }
        /**
         * Accessor for the iterationCount attribute.
         * @return IterationCount attribute.
         */
        getIterationCount() {
            return this.iterationCount;
        }
        /**
         * Accessor for the sentenceIndex attribute.
         * @return SentenceIndex attribute
         */
        getSentenceIndex() {
            return this.sentenceIndex;
        }
        /**
         * Accessor for the sentencePosition attribute.
         * @return SentencePosition attribute
         */
        getSentencePosition() {
            return this.sentencePosition;
        }
        /**
         * Updates the alpha parameter after 10000 words has been processed.
         */
        alphaUpdate() {
            if (this.wordCount - this.lastWordCount > 10000) {
                this.wordCountActual += this.wordCount - this.lastWordCount;
                this.lastWordCount = this.wordCount;
                this.alpha = this.startingAlpha * (1 - this.wordCountActual /
                    (this.wordToVecParameter.getNumberOfIterations() * this.corpus.numberOfWords() + 1.0));
                if (this.alpha < this.startingAlpha * 0.0001)
                    this.alpha = this.startingAlpha * 0.0001;
            }
        }
        /**
         * Updates sentencePosition, sentenceIndex (if needed) and returns the current sentence processed. If one sentence
         * is finished, the position shows the beginning of the next sentence and sentenceIndex is incremented. If the
         * current sentence is the last sentence, the system shuffles the sentences and returns the first sentence.
         * @param currentSentence Current sentence processed.
         * @return If current sentence is not changed, currentSentence; if changed the next sentence; if next sentence is
         * the last sentence; shuffles the corpus and returns the first sentence.
         */
        sentenceUpdate(currentSentence) {
            this.sentencePosition++;
            if (this.sentencePosition >= currentSentence.wordCount()) {
                this.wordCount += currentSentence.wordCount();
                this.sentenceIndex++;
                this.sentencePosition = 0;
                if (this.sentenceIndex == this.corpus.sentenceCount()) {
                    this.iterationCount++;
                    this.wordCount = 0;
                    this.lastWordCount = 0;
                    this.sentenceIndex = 0;
                    this.corpus.shuffleSentences(1);
                }
                return this.corpus.getSentence(this.sentenceIndex);
            }
            return currentSentence;
        }
    }
    exports.Iteration = Iteration;
});
//# sourceMappingURL=Iteration.js.map