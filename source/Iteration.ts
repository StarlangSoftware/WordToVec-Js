import {Corpus} from "nlptoolkit-corpus/dist/Corpus";
import {WordToVecParameter} from "./WordToVecParameter";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";

export class Iteration {

    private wordCount : number = 0
    private lastWordCount : number = 0
    private wordCountActual : number = 0;
    private iterationCount : number = 0;
    private sentencePosition : number = 0
    private sentenceIndex : number = 0;
    private startingAlpha: number;
    private alpha: number;
    private corpus: Corpus;
    private wordToVecParameter: WordToVecParameter;

    /**
     * Constructor for the {@link Iteration} class. Get corpus and parameter as input, sets the corresponding
     * parameters.
     * @param corpus Corpus used to train word vectors using Word2Vec algorithm.
     * @param wordToVecParameter Parameters of the Word2Vec algorithm.
     */
    constructor(corpus: Corpus, wordToVecParameter: WordToVecParameter) {
        this.corpus = corpus
        this.wordToVecParameter = wordToVecParameter
        this.startingAlpha = wordToVecParameter.getAlpha()
        this.alpha = wordToVecParameter.getAlpha()
    }

    /**
     * Accessor for the alpha attribute.
     * @return Alpha attribute.
     */
    getAlpha(): number{
        return this.alpha
    }

    /**
     * Accessor for the iterationCount attribute.
     * @return IterationCount attribute.
     */
    getIterationCount(): number{
        return this.iterationCount
    }

    /**
     * Accessor for the sentenceIndex attribute.
     * @return SentenceIndex attribute
     */
    getSentenceIndex(): number{
        return this.sentenceIndex
    }

    /**
     * Accessor for the sentencePosition attribute.
     * @return SentencePosition attribute
     */
    getSentencePosition(): number{
        return this.sentencePosition
    }

    /**
     * Updates the alpha parameter after 10000 words has been processed.
     */
    alphaUpdate(){
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
    sentenceUpdate(currentSentence: Sentence): Sentence{
        this.sentencePosition++;
        if (this.sentencePosition >= currentSentence.wordCount()) {
            this.wordCount += currentSentence.wordCount();
            this.sentenceIndex++;
            this.sentencePosition = 0;
            if (this.sentenceIndex == this.corpus.sentenceCount()){
                this.iterationCount++;
                this.wordCount = 0;
                this.lastWordCount = 0;
                this.sentenceIndex = 0;
            }
            return this.corpus.getSentence(this.sentenceIndex);
        }
        return currentSentence;
    }
}