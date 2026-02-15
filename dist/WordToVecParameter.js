"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordToVecParameter = void 0;
class WordToVecParameter {
    layerSize = 100;
    cbow = true;
    alpha = 0.025;
    window = 5;
    hierarchicalSoftMax = false;
    negativeSamplingSize = 5;
    numberOfIterations = 2;
    seed = 1;
    /**
     * Empty constructor for Word2Vec parameter
     */
    constructor() {
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
//# sourceMappingURL=WordToVecParameter.js.map