export declare class WordToVecParameter {
    private layerSize;
    private cbow;
    private alpha;
    private window;
    private hierarchicalSoftMax;
    private negativeSamplingSize;
    private numberOfIterations;
    private seed;
    /**
     * Empty constructor for Word2Vec parameter
     */
    constructor();
    /**
     * Accessor for layerSize attribute.
     * @return Size of the word vectors.
     */
    getLayerSize(): number;
    /**
     * Accessor for CBow attribute.
     * @return True is CBow will be applied, false otherwise.
     */
    isCbow(): boolean;
    /**
     * Accessor for the alpha attribute.
     * @return Current learning rate alpha.
     */
    getAlpha(): number;
    /**
     * Accessor for the window size attribute.
     * @return Current window size.
     */
    getWindow(): number;
    /**
     * Accessor for the hierarchicalSoftMax attribute.
     * @return If hierarchical softmax will be applied, returns true; false otherwise.
     */
    isHierarchicalSoftMax(): boolean;
    /**
     * Accessor for the negativeSamplingSize attribute.
     * @return number of negative samples that will be withdrawn.
     */
    getNegativeSamplingSize(): number;
    /**
     * Accessor for the numberOfIterations attribute.
     * @return number of epochs to train the network.
     */
    getNumberOfIterations(): number;
    /**
     * Accessor for the seed attribute.
     * @return Seed to train the network.
     */
    getSeed(): number;
    /**
     * Mutator for the layerSize attribute.
     * @param layerSize New size of the word vectors.
     */
    setLayerSize(layerSize: number): void;
    /**
     * Mutator for cBow attribute
     * @param cbow True if CBow applied; false if SkipGram applied.
     */
    setCbow(cbow: boolean): void;
    /**
     * Mutator for alpha attribute
     * @param alpha New learning rate.
     */
    setAlpha(alpha: number): void;
    /**
     * Mutator for the window size attribute.
     * @param window New window size.
     */
    setWindow(window: number): void;
    /**
     * Mutator for the hierarchicalSoftMax attribute.
     * @param hierarchicalSoftMax True is hierarchical softMax applied; false otherwise.
     */
    setHierarchicalSoftMax(hierarchicalSoftMax: boolean): void;
    /**
     * Mutator for the negativeSamplingSize attribute.
     * @param negativeSamplingSize New number of negative instances that will be withdrawn.
     */
    setNegativeSampleSize(negativeSamplingSize: number): void;
    /**
     * Mutator for the numberOfIterations attribute.
     * @param numberOfIterations New number of iterations.
     */
    setNumberOfIterations(numberOfIterations: number): void;
    /**
     * Mutator for the seed attribute.
     * @param seed New number of seed.
     */
    setSeed(seed: number): void;
}
