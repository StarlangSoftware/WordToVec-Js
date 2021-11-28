(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-dictionary/dist/Dictionary/Word"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VocabularyWord = void 0;
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class VocabularyWord extends Word_1.Word {
        /**
         * Constructor for a {@link VocabularyWord}. The constructor gets name and count values and sets the corresponding
         * attributes. It also initializes the code and point arrays for this word.
         * @param name Lemma of the word
         * @param count Number of occurrences of this word in the corpus
         */
        constructor(name, count) {
            super(name);
            this.count = count;
            this.code = new Array(VocabularyWord.MAX_CODE_LENGTH).fill(0);
            this.point = new Array(VocabularyWord.MAX_CODE_LENGTH).fill(0);
            this.codeLength = 0;
        }
        /**
         * Accessor for the count attribute.
         * @return Number of occurrences of this word.
         */
        getCount() {
            return this.count;
        }
        /**
         * Mutator for codeLength attribute.
         * @param codeLength New value for the codeLength.
         */
        setCodeLength(codeLength) {
            this.codeLength = codeLength;
        }
        /**
         * Mutator for code attribute.
         * @param index Index of the code
         * @param value New value for that indexed element of code.
         */
        setCode(index, value) {
            this.code[index] = value;
        }
        /**
         * Mutator for point attribute.
         * @param index Index of the point
         * @param value New value for that indexed element of point.
         */
        setPoint(index, value) {
            this.point[index] = value;
        }
        /**
         * Accessor for the codeLength attribute.
         * @return Length of the Huffman code for this word.
         */
        getCodeLength() {
            return this.codeLength;
        }
        /**
         * Accessor for point attribute.
         * @param index Index of the point.
         * @return Value for that indexed element of point.
         */
        getPoint(index) {
            return this.point[index];
        }
        /**
         * Accessor for code attribute.
         * @param index Index of the code.
         * @return Value for that indexed element of code.
         */
        getCode(index) {
            return this.code[index];
        }
    }
    exports.VocabularyWord = VocabularyWord;
    VocabularyWord.MAX_CODE_LENGTH = 40;
});
//# sourceMappingURL=VocabularyWord.js.map