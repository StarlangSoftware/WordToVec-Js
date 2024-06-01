import {WordPair} from "./WordPair";
import * as fs from "fs";
import {VectorizedDictionary} from "nlptoolkit-dictionary/dist/Dictionary/VectorizedDictionary";
import {VectorizedWord} from "nlptoolkit-dictionary/dist/Dictionary/VectorizedWord";

export class SemanticDataSet {

    private readonly pairs: Array<WordPair>

    /**
     * Constructor for the semantic dataset. Reads word pairs and their similarity scores from an input file.
     * @param fileName Input file that stores the word pair and similarity scores.
     */
    constructor(fileName: string = undefined) {
        this.pairs = new Array<WordPair>()
        if (fileName != undefined){
            let data = fs.readFileSync(fileName, 'utf8')
            let lines = data.split("\n")
            for (let line of lines){
                let items = line.split(" ")
                this.pairs.push(new WordPair(items[0], items[1], parseFloat(items[2])))
            }
        }
    }

    /**
     * Calculates the similarities between words in the dataset. The word vectors will be taken from the input
     * vectorized dictionary.
     * @param dictionary Vectorized dictionary that stores the word vectors.
     * @return Word pairs and their calculated similarities stored as a semantic dataset.
     */
    public calculateSimilarities(dictionary: VectorizedDictionary) : SemanticDataSet{
        let result = new SemanticDataSet()
        for (let i = 0; i < this.pairs.length; i++){
            let word1 = this.pairs[i].getWord1()
            let word2 = this.pairs[i].getWord2()
            let vectorizedWord1 = dictionary.getWord(word1)
            let vectorizedWord2 = dictionary.getWord(word2)
            if (vectorizedWord1 != undefined && vectorizedWord2 != undefined
                && vectorizedWord1 instanceof VectorizedWord && vectorizedWord2 instanceof  VectorizedWord){
                let similarity = vectorizedWord1.getVector().cosineSimilarity(vectorizedWord2.getVector())
                result.pairs.push(new WordPair(word1, word2, similarity))
            } else {
                this.pairs.splice(i, 1)
                i = i - 1
            }
        }
        return result
    }

    /**
     * Returns the size of the semantic dataset.
     * @return The size of the semantic dataset.
     */
    public size() : number{
        return this.pairs.length
    }

    /**
     * Sorts the word pairs in the dataset according to the WordPairComparator.
     */
    private sort(){
        this.pairs.sort((a: WordPair, b: WordPair) => a.getRelatedBy() < b.getRelatedBy() ? 1 : a.getRelatedBy() > b.getRelatedBy() ? -1: 0)
    }

    /**
     * Finds and returns the index of a word pair in the pairs array list. If there is no such word pair, it
     * returns -1.
     * @param wordPair Word pair to search in the semantic dataset.
     * @return Index of the given word pair in the pairs array list. If it does not exist, the method returns -1.
     */
    public index(wordPair: WordPair): number{
        for (let i = 0; i < this.pairs.length; i++){
            if (wordPair.equals(this.pairs[i])){
                return i;
            }
        }
        return -1
    }

    /**
     * Calculates the Spearman correlation coefficient with this dataset to the given semantic dataset.
     * @param semanticDataSet Given semantic dataset with which Spearman correlation coefficient is calculated.
     * @return Spearman correlation coefficient with the given semantic dataset.
     */
    public spearmanCorrelation(semanticDataSet: SemanticDataSet): number{
        let sum = 0
        this.sort()
        semanticDataSet.sort()
        for (let i = 0; i < this.pairs.length; i++){
            let rank1 = i + 1
            let rank2 = semanticDataSet.index(this.pairs[i]) + 1
            let di = rank1 - rank2
            sum += 6 * di * di
        }
        let n = this.pairs.length
        let ratio = sum / (n * (n * n - 1))
        return 1 - ratio
    }
}