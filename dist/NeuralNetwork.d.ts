import { Corpus } from "nlptoolkit-corpus/dist/Corpus";
import { WordToVecParameter } from "./WordToVecParameter";
import { VectorizedDictionary } from "nlptoolkit-dictionary/dist/Dictionary/VectorizedDictionary";
export declare class NeuralNetwork {
    private wordVectors;
    private wordVectorUpdate;
    private vocabulary;
    private parameter;
    private corpus;
    private expTable;
    private static EXP_TABLE_SIZE;
    private static MAX_EXP;
    /**
     * Constructor for the {@link NeuralNetwork} class. Gets corpus and network parameters as input and sets the
     * corresponding parameters first. After that, initializes the network with random weights between -0.5 and 0.5.
     * Constructs vector update matrix and prepares the exp table.
     * @param corpus Corpus used to train word vectors using Word2Vec algorithm.
     * @param parameter Parameters of the Word2Vec algorithm.
     */
    constructor(corpus: Corpus, parameter: WordToVecParameter);
    vocabularySize(): number;
    /**
     * Constructs the fast exponentiation table. Instead of taking exponent at each time, the algorithm will lookup
     * the table.
     */
    private prepareExpTable;
    /**
     * Main method for training the Word2Vec algorithm. Depending on the training parameter, CBox or SkipGram algorithm
     * is applied.
     * @return Dictionary of word vectors.
     */
    train(): VectorizedDictionary;
    /**
     * Calculates G value in the Word2Vec algorithm.
     * @param f F value.
     * @param alpha Learning rate alpha.
     * @param label Label of the instance.
     * @return Calculated G value.
     */
    private calculateG;
    /**
     * Main method for training the CBow version of Word2Vec algorithm.
     */
    private trainCbow;
    /**
     * Main method for training the SkipGram version of Word2Vec algorithm.
     */
    private trainSkipGram;
}
