import { Corpus } from "nlptoolkit-corpus/dist/Corpus";
import { WordToVecParameter } from "./WordToVecParameter";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
export declare class Iteration {
    private wordCount;
    private lastWordCount;
    private wordCountActual;
    private iterationCount;
    private sentencePosition;
    private sentenceIndex;
    private startingAlpha;
    private alpha;
    private corpus;
    private wordToVecParameter;
    /**
     * Constructor for the {@link Iteration} class. Get corpus and parameter as input, sets the corresponding
     * parameters.
     * @param corpus Corpus used to train word vectors using Word2Vec algorithm.
     * @param wordToVecParameter Parameters of the Word2Vec algorithm.
     */
    constructor(corpus: Corpus, wordToVecParameter: WordToVecParameter);
    /**
     * Accessor for the alpha attribute.
     * @return Alpha attribute.
     */
    getAlpha(): number;
    /**
     * Accessor for the iterationCount attribute.
     * @return IterationCount attribute.
     */
    getIterationCount(): number;
    /**
     * Accessor for the sentenceIndex attribute.
     * @return SentenceIndex attribute
     */
    getSentenceIndex(): number;
    /**
     * Accessor for the sentencePosition attribute.
     * @return SentencePosition attribute
     */
    getSentencePosition(): number;
    /**
     * Updates the alpha parameter after 10000 words has been processed.
     */
    alphaUpdate(): void;
    /**
     * Updates sentencePosition, sentenceIndex (if needed) and returns the current sentence processed. If one sentence
     * is finished, the position shows the beginning of the next sentence and sentenceIndex is incremented. If the
     * current sentence is the last sentence, the system shuffles the sentences and returns the first sentence.
     * @param currentSentence Current sentence processed.
     * @return If current sentence is not changed, currentSentence; if changed the next sentence; if next sentence is
     * the last sentence; shuffles the corpus and returns the first sentence.
     */
    sentenceUpdate(currentSentence: Sentence): Sentence;
}
