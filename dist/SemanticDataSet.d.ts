import { WordPair } from "./WordPair";
import { VectorizedDictionary } from "nlptoolkit-dictionary/dist/Dictionary/VectorizedDictionary";
export declare class SemanticDataSet {
    private readonly pairs;
    /**
     * Constructor for the semantic dataset. Reads word pairs and their similarity scores from an input file.
     * @param fileName Input file that stores the word pair and similarity scores.
     */
    constructor(fileName?: string);
    /**
     * Calculates the similarities between words in the dataset. The word vectors will be taken from the input
     * vectorized dictionary.
     * @param dictionary Vectorized dictionary that stores the word vectors.
     * @return Word pairs and their calculated similarities stored as a semantic dataset.
     */
    calculateSimilarities(dictionary: VectorizedDictionary): SemanticDataSet;
    /**
     * Returns the size of the semantic dataset.
     * @return The size of the semantic dataset.
     */
    size(): number;
    /**
     * Sorts the word pairs in the dataset according to the WordPairComparator.
     */
    private sort;
    /**
     * Finds and returns the index of a word pair in the pairs array list. If there is no such word pair, it
     * returns -1.
     * @param wordPair Word pair to search in the semantic dataset.
     * @return Index of the given word pair in the pairs array list. If it does not exist, the method returns -1.
     */
    index(wordPair: WordPair): number;
    /**
     * Calculates the Spearman correlation coefficient with this dataset to the given semantic dataset.
     * @param semanticDataSet Given semantic dataset with which Spearman correlation coefficient is calculated.
     * @return Spearman correlation coefficient with the given semantic dataset.
     */
    spearmanCorrelation(semanticDataSet: SemanticDataSet): number;
}
