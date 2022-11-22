(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WordPair = void 0;
    class WordPair {
        constructor(word1, word2, relatedBy) {
            this.word1 = word1;
            this.word2 = word2;
            this.relatedBy = relatedBy;
        }
        equals(obj) {
            return this.word1 == obj.word1 && this.word2 == obj.word2;
        }
        getRelatedBy() {
            return this.relatedBy;
        }
        setRelatedBy(relatedBy) {
            this.relatedBy = relatedBy;
        }
        getWord1() {
            return this.word1;
        }
        getWord2() {
            return this.word2;
        }
    }
    exports.WordPair = WordPair;
});
//# sourceMappingURL=WordPair.js.map