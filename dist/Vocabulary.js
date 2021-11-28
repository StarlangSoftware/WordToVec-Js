(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./VocabularyWord", "nlptoolkit-dictionary/dist/Dictionary/Word", "nlptoolkit-dictionary/dist/Dictionary/WordComparator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vocabulary = void 0;
    const VocabularyWord_1 = require("./VocabularyWord");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    const WordComparator_1 = require("nlptoolkit-dictionary/dist/Dictionary/WordComparator");
    class Vocabulary {
        /**
         * Constructor for the {@link Vocabulary} class. For each distinct word in the corpus, a {@link VocabularyWord}
         * instance is created. After that, words are sorted according to their occurrences. Unigram table is constructed,
         * where after Huffman tree is created based on the number of occurrences of the words.
         * @param corpus Corpus used to train word vectors using Word2Vec algorithm.
         */
        constructor(corpus) {
            this.vocabulary = new Array();
            this.table = new Array();
            this.wordComparator = (comparator) => (word1, word2) => (comparator == WordComparator_1.WordComparator.TURKISH ?
                word1.getName().localeCompare(word2.getName(), "tr") :
                (comparator == WordComparator_1.WordComparator.TURKISH_IGNORE_CASE ? word1.getName().toLocaleLowerCase("tr").localeCompare(word2.getName().toLocaleLowerCase("tr"), "tr") :
                    word1.getName().localeCompare(word2.getName(), "en")));
            let wordList = corpus.getWordList();
            for (let word of wordList) {
                this.vocabulary.push(new VocabularyWord_1.VocabularyWord(word, corpus.getCount(new Word_1.Word(word))));
            }
            this.vocabulary.sort(this.wordComparator(WordComparator_1.WordComparator.ENGLISH));
            this.createUniGramTable();
            this.constructHuffmanTree();
            this.vocabulary.sort(this.wordComparator(WordComparator_1.WordComparator.TURKISH));
        }
        /**
         * Returns number of words in the vocabulary.
         * @return Number of words in the vocabulary.
         */
        size() {
            return this.vocabulary.length;
        }
        binarySearch(word) {
            let lo = 0;
            let hi = this.vocabulary.length - 1;
            while (lo <= hi) {
                let mid = Math.floor((lo + hi) / 2);
                if (this.vocabulary[mid].getName() == word.getName()) {
                    return mid;
                }
                if (this.wordComparator(WordComparator_1.WordComparator.TURKISH)(this.vocabulary[mid], word) <= 0) {
                    lo = mid + 1;
                }
                else {
                    hi = mid - 1;
                }
            }
            return -lo;
        }
        /**
         * Searches a word and returns the position of that word in the vocabulary. Search is done using binary search.
         * @param word Word to be searched.
         * @return Position of the word searched.
         */
        getPosition(word) {
            return this.binarySearch(word);
        }
        /**
         * Returns the word at a given index.
         * @param index Index of the word.
         * @return The word at a given index.
         */
        getWord(index) {
            return this.vocabulary[index];
        }
        /**
         * Constructs Huffman Tree based on the number of occurences of the words.
         */
        constructHuffmanTree() {
            let count = new Array();
            let code = new Array(VocabularyWord_1.VocabularyWord.MAX_CODE_LENGTH).fill(0);
            let point = new Array(VocabularyWord_1.VocabularyWord.MAX_CODE_LENGTH).fill(0);
            let binary = new Array(this.vocabulary.length * 2 + 1);
            let parentNode = new Array(this.vocabulary.length * 2 + 1);
            for (let a = 0; a < this.vocabulary.length; a++) {
                count.push(this.vocabulary[a].getCount());
            }
            for (let a = this.vocabulary.length; a < this.vocabulary.length * 2; a++) {
                count.push(1000000000);
            }
            let pos1 = this.vocabulary.length - 1;
            let pos2 = this.vocabulary.length;
            for (let a = 0; a < this.vocabulary.length - 1; a++) {
                let min1i, min2i;
                if (pos1 >= 0) {
                    if (count[pos1] < count[pos2]) {
                        min1i = pos1;
                        pos1--;
                    }
                    else {
                        min1i = pos2;
                        pos2++;
                    }
                }
                else {
                    min1i = pos2;
                    pos2++;
                }
                if (pos1 >= 0) {
                    if (count[pos1] < count[pos2]) {
                        min2i = pos1;
                        pos1--;
                    }
                    else {
                        min2i = pos2;
                        pos2++;
                    }
                }
                else {
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
        createUniGramTable() {
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
        getTableValue(index) {
            return this.table[index];
        }
        /**
         * Returns size of the unigram table.
         * @return Size of the unigram table.
         */
        getTableSize() {
            return this.table.length;
        }
    }
    exports.Vocabulary = Vocabulary;
});
//# sourceMappingURL=Vocabulary.js.map