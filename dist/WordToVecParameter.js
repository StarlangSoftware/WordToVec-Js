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
    exports.WordToVecParameter = void 0;
    class WordToVecParameter {
        /**
         * Empty constructor for Word2Vec parameter
         */
        constructor() {
            this.layerSize = 100;
            this.cbow = true;
            this.alpha = 0.025;
            this.window = 5;
            this.hierarchicalSoftMax = false;
            this.negativeSamplingSize = 5;
            this.numberOfIterations = 2;
            this.seed = 1;
        }
        /**
         * Accessor for layerSize attribute.
         * @return Size of the word vectors.
         */
        getLayerSize() {
            return this.layerSize;
        }
        /**
         * Accessor for CBow attribute.
         * @return True is CBow will be applied, false otherwise.
         */
        isCbow() {
            return this.cbow;
        }
        /**
         * Accessor for the alpha attribute.
         * @return Current learning rate alpha.
         */
        getAlpha() {
            return this.alpha;
        }
        /**
         * Accessor for the window size attribute.
         * @return Current window size.
         */
        getWindow() {
            return this.window;
        }
        /**
         * Accessor for the hierarchicalSoftMax attribute.
         * @return If hierarchical softmax will be applied, returns true; false otherwise.
         */
        isHierarchicalSoftMax() {
            return this.hierarchicalSoftMax;
        }
        /**
         * Accessor for the negativeSamplingSize attribute.
         * @return number of negative samples that will be withdrawn.
         */
        getNegativeSamplingSize() {
            return this.negativeSamplingSize;
        }
        /**
         * Accessor for the numberOfIterations attribute.
         * @return number of epochs to train the network.
         */
        getNumberOfIterations() {
            return this.numberOfIterations;
        }
        /**
         * Accessor for the seed attribute.
         * @return Seed to train the network.
         */
        getSeed() {
            return this.seed;
        }
        /**
         * Mutator for the layerSize attribute.
         * @param layerSize New size of the word vectors.
         */
        setLayerSize(layerSize) {
            this.layerSize = layerSize;
        }
        /**
         * Mutator for cBow attribute
         * @param cbow True if CBow applied; false if SkipGram applied.
         */
        setCbow(cbow) {
            this.cbow = cbow;
        }
        /**
         * Mutator for alpha attribute
         * @param alpha New learning rate.
         */
        setAlpha(alpha) {
            this.alpha = alpha;
        }
        /**
         * Mutator for the window size attribute.
         * @param window New window size.
         */
        setWindow(window) {
            this.window = window;
        }
        /**
         * Mutator for the hierarchicalSoftMax attribute.
         * @param hierarchicalSoftMax True is hierarchical softMax applied; false otherwise.
         */
        setHierarchicalSoftMax(hierarchicalSoftMax) {
            this.hierarchicalSoftMax = hierarchicalSoftMax;
        }
        /**
         * Mutator for the negativeSamplingSize attribute.
         * @param negativeSamplingSize New number of negative instances that will be withdrawn.
         */
        setNegativeSampleSize(negativeSamplingSize) {
            this.negativeSamplingSize = negativeSamplingSize;
        }
        /**
         * Mutator for the numberOfIterations attribute.
         * @param numberOfIterations New number of iterations.
         */
        setNumberOfIterations(numberOfIterations) {
            this.numberOfIterations = numberOfIterations;
        }
        /**
         * Mutator for the seed attribute.
         * @param seed New number of seed.
         */
        setSeed(seed) {
            this.seed = seed;
        }
    }
    exports.WordToVecParameter = WordToVecParameter;
});
//# sourceMappingURL=WordToVecParameter.js.map