export class WordToVecParameter {

    private layerSize : number = 100;
    private cbow : boolean = true;
    private alpha : number = 0.025;
    private window : number = 5;
    private hierarchicalSoftMax : boolean = false;
    private negativeSamplingSize : number = 5;
    private numberOfIterations : number = 3;
    private seed : number = 1;

    /**
     * Empty constructor for Word2Vec parameter
     */
    constructor() {
    }

    /**
     * Accessor for layerSize attribute.
     * @return Size of the word vectors.
     */
    getLayerSize(): number{
        return this.layerSize
    }

    /**
     * Accessor for CBow attribute.
     * @return True is CBow will be applied, false otherwise.
     */
    isCbow(): boolean{
        return this.cbow
    }

    /**
     * Accessor for the alpha attribute.
     * @return Current learning rate alpha.
     */
    getAlpha(): number{
        return this.alpha
    }

    /**
     * Accessor for the window size attribute.
     * @return Current window size.
     */
    getWindow(): number{
        return this.window
    }

    /**
     * Accessor for the hierarchicalSoftMax attribute.
     * @return If hierarchical softmax will be applied, returns true; false otherwise.
     */
    isHierarchicalSoftMax(): boolean{
        return this.hierarchicalSoftMax
    }

    /**
     * Accessor for the negativeSamplingSize attribute.
     * @return number of negative samples that will be withdrawn.
     */
    getNegativeSamplingSize(): number{
        return this.negativeSamplingSize
    }

    /**
     * Accessor for the numberOfIterations attribute.
     * @return number of epochs to train the network.
     */
    getNumberOfIterations(): number{
        return this.numberOfIterations
    }

    /**
     * Accessor for the seed attribute.
     * @return Seed to train the network.
     */
    getSeed(): number{
        return this.seed
    }

    /**
     * Mutator for the layerSize attribute.
     * @param layerSize New size of the word vectors.
     */
    setLayerSize(layerSize: number){
        this.layerSize = layerSize
    }

    /**
     * Mutator for cBow attribute
     * @param cbow True if CBow applied; false if SkipGram applied.
     */
    setCbow(cbow: boolean){
        this.cbow = cbow
    }

    /**
     * Mutator for alpha attribute
     * @param alpha New learning rate.
     */
    setAlpha(alpha: number){
        this.alpha = alpha
    }

    /**
     * Mutator for the window size attribute.
     * @param window New window size.
     */
    setWindow(window: number){
        this.window = window
    }

    /**
     * Mutator for the hierarchicalSoftMax attribute.
     * @param hierarchicalSoftMax True is hierarchical softMax applied; false otherwise.
     */
    setHierarchicalSoftMax(hierarchicalSoftMax: boolean){
        this.hierarchicalSoftMax = hierarchicalSoftMax
    }

    /**
     * Mutator for the negativeSamplingSize attribute.
     * @param negativeSamplingSize New number of negative instances that will be withdrawn.
     */
    setNegativeSampleSize(negativeSamplingSize: number){
        this.negativeSamplingSize = negativeSamplingSize
    }

    /**
     * Mutator for the numberOfIterations attribute.
     * @param numberOfIterations New number of iterations.
     */
    setNumberOfIterations(numberOfIterations: number){
        this.numberOfIterations = numberOfIterations
    }

    /**
     * Mutator for the seed attribute.
     * @param seed New number of seed.
     */
    setSeed(seed: number){
        this.seed = seed
    }
}