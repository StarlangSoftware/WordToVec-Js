import { VocabularyWord } from "./VocabularyWord";
import { Corpus } from "nlptoolkit-corpus/dist/Corpus";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
import { WordComparator } from "nlptoolkit-dictionary/dist/Dictionary/WordComparator";
export declare class Vocabulary {
    private vocabulary;
    private table;
    private wordMap;
    wordComparator: (comparator: WordComparator) => (word1: Word, word2: Word) => number;
    /**
     * Constructor for the {@link Vocabulary} class. For each distinct word in the corpus, a {@link VocabularyWord}
     * instance is created. After that, words are sorted according to their occurrences. Unigram table is constructed,
     * where after Huffman tree is created based on the number of occurrences of the words.
     * @param corpus Corpus used to train word vectors using Word2Vec algorithm.
     */
    constructor(corpus: Corpus);
    /**
     * Returns number of words in the vocabulary.
     * @return Number of words in the vocabulary.
     */
    size(): number;
    /**
     * Searches a word and returns the position of that word in the vocabulary. Search is done using binary search.
     * @param word Word to be searched.
     * @return Position of the word searched.
     */
    getPosition(word: Word): number;
    /**
     * Returns the word at a given index.
     * @param index Index of the word.
     * @return The word at a given index.
     */
    getWord(index: number): VocabularyWord;
    /**
     * Constructs Huffman Tree based on the number of occurences of the words.
     */
    private constructHuffmanTree;
    /**
     * Constructs the unigram table based on the number of occurences of the words.
     */
    private createUniGramTable;
    /**
     * Accessor for the unigram table.
     * @param index Index of the word.
     * @return Unigram table value at a given index.
     */
    getTableValue(index: number): number;
    /**
     * Returns size of the unigram table.
     * @return Size of the unigram table.
     */
    getTableSize(): number;
}
