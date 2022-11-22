import { WordPair } from "./WordPair";
import { VectorizedDictionary } from "nlptoolkit-dictionary/dist/Dictionary/VectorizedDictionary";
export declare class SemanticDataSet {
    private readonly pairs;
    constructor(fileName?: string);
    calculateSimilarities(dictionary: VectorizedDictionary): SemanticDataSet;
    size(): number;
    private sort;
    index(wordPair: WordPair): number;
    spearmanCorrelation(semanticDataSet: SemanticDataSet): number;
}
