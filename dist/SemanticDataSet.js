(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./WordPair", "fs", "nlptoolkit-dictionary/dist/Dictionary/VectorizedWord"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SemanticDataSet = void 0;
    const WordPair_1 = require("./WordPair");
    const fs = require("fs");
    const VectorizedWord_1 = require("nlptoolkit-dictionary/dist/Dictionary/VectorizedWord");
    class SemanticDataSet {
        constructor(fileName = undefined) {
            this.pairs = new Array();
            if (fileName != undefined) {
                let data = fs.readFileSync(fileName, 'utf8');
                let lines = data.split("\n");
                for (let line of lines) {
                    let items = line.split(" ");
                    this.pairs.push(new WordPair_1.WordPair(items[0], items[1], parseFloat(items[2])));
                }
            }
        }
        calculateSimilarities(dictionary) {
            let result = new SemanticDataSet();
            for (let i = 0; i < this.pairs.length; i++) {
                let word1 = this.pairs[i].getWord1();
                let word2 = this.pairs[i].getWord2();
                let vectorizedWord1 = dictionary.getWord(word1);
                let vectorizedWord2 = dictionary.getWord(word2);
                if (vectorizedWord1 != undefined && vectorizedWord2 != undefined
                    && vectorizedWord1 instanceof VectorizedWord_1.VectorizedWord && vectorizedWord2 instanceof VectorizedWord_1.VectorizedWord) {
                    let similarity = vectorizedWord1.getVector().cosineSimilarity(vectorizedWord2.getVector());
                    result.pairs.push(new WordPair_1.WordPair(word1, word2, similarity));
                }
                else {
                    this.pairs.splice(i, 1);
                    i = i - 1;
                }
            }
            return result;
        }
        size() {
            return this.pairs.length;
        }
        sort() {
            this.pairs.sort((a, b) => a.getRelatedBy() < b.getRelatedBy() ? 1 : a.getRelatedBy() > b.getRelatedBy() ? -1 : 0);
        }
        index(wordPair) {
            for (let i = 0; i < this.pairs.length; i++) {
                if (wordPair.equals(this.pairs[i])) {
                    return i;
                }
            }
            return -1;
        }
        spearmanCorrelation(semanticDataSet) {
            let sum = 0;
            this.sort();
            semanticDataSet.sort();
            for (let i = 0; i < this.pairs.length; i++) {
                let rank1 = i + 1;
                let rank2 = semanticDataSet.index(this.pairs[i]) + 1;
                let di = rank1 - rank2;
                sum += 6 * di * di;
            }
            let n = this.pairs.length;
            let ratio = sum / (n * (n * n - 1));
            return 1 - ratio;
        }
    }
    exports.SemanticDataSet = SemanticDataSet;
});
//# sourceMappingURL=SemanticDataSet.js.map