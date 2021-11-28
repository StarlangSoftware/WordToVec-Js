import {VocabularyWord} from "./VocabularyWord";
import {Corpus} from "nlptoolkit-corpus/dist/Corpus";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {WordComparator} from "nlptoolkit-dictionary/dist/Dictionary/WordComparator";

export class Vocabulary {

    private vocabulary: Array<VocabularyWord> = new Array<VocabularyWord>()
    private table: Array<number> = new Array<number>()

    wordComparator = (comparator: WordComparator) =>
        (word1: Word, word2: Word) => (comparator == WordComparator.TURKISH ?
                word1.getName().localeCompare(word2.getName(), "tr") :
                (comparator == WordComparator.TURKISH_IGNORE_CASE ? word1.getName().toLocaleLowerCase("tr").localeCompare(word2.getName().toLocaleLowerCase("tr"), "tr") :
                    word1.getName().localeCompare(word2.getName(), "en"))
        )

    /**
     * Constructor for the {@link Vocabulary} class. For each distinct word in the corpus, a {@link VocabularyWord}
     * instance is created. After that, words are sorted according to their occurrences. Unigram table is constructed,
     * where after Huffman tree is created based on the number of occurrences of the words.
     * @param corpus Corpus used to train word vectors using Word2Vec algorithm.
     */
    constructor(corpus: Corpus) {
        let wordList = corpus.getWordList();
        for (let word of wordList){
            this.vocabulary.push(new VocabularyWord(word, corpus.getCount(new Word(word))));
        }
        this.vocabulary.sort(this.wordComparator(WordComparator.ENGLISH))
        this.createUniGramTable();
        this.constructHuffmanTree();
        this.vocabulary.sort(this.wordComparator(WordComparator.TURKISH))
    }

    /**
     * Returns number of words in the vocabulary.
     * @return Number of words in the vocabulary.
     */
    size(): number{
        return this.vocabulary.length
    }

    binarySearch(word: Word): number{
        let lo = 0
        let hi = this.vocabulary.length - 1
        while (lo <= hi){
            let mid = Math.floor((lo + hi) / 2)
            if (this.vocabulary[mid].getName() == word.getName()){
                return mid
            }
            if (this.wordComparator(WordComparator.TURKISH)(this.vocabulary[mid], word) <= 0) {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
        return -lo
    }

    /**
     * Searches a word and returns the position of that word in the vocabulary. Search is done using binary search.
     * @param word Word to be searched.
     * @return Position of the word searched.
     */
    getPosition(word: Word): number{
        return this.binarySearch(word)
    }

    /**
     * Returns the word at a given index.
     * @param index Index of the word.
     * @return The word at a given index.
     */
    getWord(index: number): VocabularyWord{
        return this.vocabulary[index]
    }

    /**
     * Constructs Huffman Tree based on the number of occurences of the words.
     */
    private constructHuffmanTree(){
        let count = new Array<number>();
        let code = new Array<number>(VocabularyWord.MAX_CODE_LENGTH).fill(0);
        let point = new Array<number>(VocabularyWord.MAX_CODE_LENGTH).fill(0);
        let binary = new Array<number>(this.vocabulary.length * 2 + 1);
        let parentNode = new Array<number>(this.vocabulary.length * 2 + 1);
        for (let a = 0; a < this.vocabulary.length; a++){
            count.push(this.vocabulary[a].getCount());
        }
        for (let a = this.vocabulary.length; a < this.vocabulary.length * 2; a++){
            count.push(1000000000);
        }
        let pos1 = this.vocabulary.length - 1;
        let pos2 = this.vocabulary.length;
        for (let a = 0; a < this.vocabulary.length - 1; a++) {
            let min1i, min2i
            if (pos1 >= 0) {
                if (count[pos1] < count[pos2]) {
                    min1i = pos1;
                    pos1--;
                } else {
                    min1i = pos2;
                    pos2++;
                }
            } else {
                min1i = pos2;
                pos2++;
            }
            if (pos1 >= 0) {
                if (count[pos1] < count[pos2]) {
                    min2i = pos1;
                    pos1--;
                } else {
                    min2i = pos2;
                    pos2++;
                }
            } else {
                min2i = pos2;
                pos2++;
            }
            count[this.vocabulary.length + a] = count[min1i] + count[min2i];
            parentNode[min1i] = this.vocabulary.length + a;
            parentNode[min2i] = this.vocabulary.length + a;
            binary[min2i] = 1;
        }
        for (let a = 0; a < this.vocabulary.length; a++) {
            let b = a;
            let i = 0;
            while (true) {
                code[i] = binary[b];
                point[i] = b;
                i++;
                b = parentNode[b];
                if (b == this.vocabulary.length * 2 - 2)
                    break;
            }
            this.vocabulary[a].setCodeLength(i);
            this.vocabulary[a].setPoint(0, this.vocabulary.length - 2);
            for (b = 0; b < i; b++) {
                this.vocabulary[a].setCode(i - b - 1, code[b]);
                this.vocabulary[a].setPoint(i - b, point[b] - this.vocabulary.length);
            }
        }
    }

    /**
     * Constructs the unigram table based on the number of occurences of the words.
     */
    private createUniGramTable(){
        let total = 0;
        for (let vocabularyWord of this.vocabulary) {
            total += Math.pow(vocabularyWord.getCount(), 0.75);
        }
        let i = 0;
        let d1 = Math.pow(this.vocabulary[i].getCount(), 0.75) / total;
        for (let a = 0; a < 2 * this.vocabulary.length; a++) {
            this.table.push(i);
            if (a / (2 * this.vocabulary.length) > d1) {
                i++;
                d1 += Math.pow(this.vocabulary[i].getCount(), 0.75) / total;
            }
            if (i >= this.vocabulary.length)
                i = this.vocabulary.length - 1;
        }
    }

    /**
     * Accessor for the unigram table.
     * @param index Index of the word.
     * @return Unigram table value at a given index.
     */
    getTableValue(index: number): number{
        return this.table[index]
    }

    /**
     * Returns size of the unigram table.
     * @return Size of the unigram table.
     */
    getTableSize(): number{
        return this.table.length
    }
}