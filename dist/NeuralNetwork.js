(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-math/dist/Matrix", "./Vocabulary", "nlptoolkit-dictionary/dist/Dictionary/VectorizedDictionary", "nlptoolkit-dictionary/dist/Dictionary/WordComparator", "nlptoolkit-dictionary/dist/Dictionary/VectorizedWord", "./Iteration", "nlptoolkit-math/dist/Vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NeuralNetwork = void 0;
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    const Vocabulary_1 = require("./Vocabulary");
    const VectorizedDictionary_1 = require("nlptoolkit-dictionary/dist/Dictionary/VectorizedDictionary");
    const WordComparator_1 = require("nlptoolkit-dictionary/dist/Dictionary/WordComparator");
    const VectorizedWord_1 = require("nlptoolkit-dictionary/dist/Dictionary/VectorizedWord");
    const Iteration_1 = require("./Iteration");
    const Vector_1 = require("nlptoolkit-math/dist/Vector");
    class NeuralNetwork {
        /**
         * Constructor for the {@link NeuralNetwork} class. Gets corpus and network parameters as input and sets the
         * corresponding parameters first. After that, initializes the network with random weights between -0.5 and 0.5.
         * Constructs vector update matrix and prepares the exp table.
         * @param corpus Corpus used to train word vectors using Word2Vec algorithm.
         * @param parameter Parameters of the Word2Vec algorithm.
         */
        constructor(corpus, parameter) {
            this.expTable = new Array();
            this.vocabulary = new Vocabulary_1.Vocabulary(corpus);
            this.parameter = parameter;
            this.corpus = corpus;
            this.wordVectors = new Matrix_1.Matrix(this.vocabulary.size(), parameter.getLayerSize(), -0.5, 0.5);
            this.wordVectorUpdate = new Matrix_1.Matrix(this.vocabulary.size(), parameter.getLayerSize());
            this.prepareExpTable();
        }
        /**
         * Constructs the fast exponentiation table. Instead of taking exponent at each time, the algorithm will lookup
         * the table.
         */
        prepareExpTable() {
            for (let i = 0; i < NeuralNetwork.EXP_TABLE_SIZE; i++) {
                this.expTable.push(Math.exp((i / NeuralNetwork.EXP_TABLE_SIZE * 2 - 1) * NeuralNetwork.MAX_EXP));
                this.expTable[i] = this.expTable[i] / (this.expTable[i] + 1);
            }
        }
        /**
         * Main method for training the Word2Vec algorithm. Depending on the training parameter, CBox or SkipGram algorithm
         * is applied.
         * @return Dictionary of word vectors.
         */
        train() {
            let result = new VectorizedDictionary_1.VectorizedDictionary(WordComparator_1.WordComparator.TURKISH);
            if (this.parameter.isCbow()) {
                this.trainCbow();
            }
            else {
                this.trainSkipGram();
            }
            for (let i = 0; i < this.vocabulary.size(); i++) {
                result.addWord(new VectorizedWord_1.VectorizedWord(this.vocabulary.getWord(i).getName(), this.wordVectors.getRowVector(i)));
            }
            return result;
        }
        /**
         * Calculates G value in the Word2Vec algorithm.
         * @param f F value.
         * @param alpha Learning rate alpha.
         * @param label Label of the instance.
         * @return Calculated G value.
         */
        calculateG(f, alpha, label) {
            if (f > NeuralNetwork.MAX_EXP) {
                return (label - 1) * alpha;
            }
            else {
                if (f < -NeuralNetwork.MAX_EXP) {
                    return label * alpha;
                }
                else {
                    return (label - this.expTable[Math.floor((f + NeuralNetwork.MAX_EXP) *
                        (NeuralNetwork.EXP_TABLE_SIZE / NeuralNetwork.MAX_EXP / 2))]) * alpha;
                }
            }
        }
        /**
         * Main method for training the CBow version of Word2Vec algorithm.
         */
        trainCbow() {
            let iteration = new Iteration_1.Iteration(this.corpus, this.parameter);
            let currentSentence = this.corpus.getSentence(iteration.getSentenceIndex());
            let outputs = new Vector_1.Vector(this.parameter.getLayerSize(), 0);
            let outputUpdate = new Vector_1.Vector(this.parameter.getLayerSize(), 0);
            this.corpus.shuffleSentences(this.parameter.getSeed());
            while (iteration.getIterationCount() < this.parameter.getNumberOfIterations()) {
                iteration.alphaUpdate();
                let wordIndex = this.vocabulary.getPosition(currentSentence.getWord(iteration.getSentencePosition()));
                let currentWord = this.vocabulary.getWord(wordIndex);
                outputs.clear();
                outputUpdate.clear();
                let b = Math.floor(Math.random() * this.parameter.getWindow());
                let cw = 0;
                for (let a = b; a < this.parameter.getWindow() * 2 + 1 - b; a++) {
                    let c = iteration.getSentencePosition() - this.parameter.getWindow() + a;
                    if (a != this.parameter.getWindow() && currentSentence.safeIndex(c)) {
                        let lastWordIndex = this.vocabulary.getPosition(currentSentence.getWord(c));
                        outputs.addVector(this.wordVectors.getRowVector(lastWordIndex));
                        cw++;
                    }
                }
                if (cw > 0) {
                    outputs.divide(cw);
                    if (this.parameter.isHierarchicalSoftMax()) {
                        for (let d = 0; d < currentWord.getCodeLength(); d++) {
                            let l2 = currentWord.getPoint(d);
                            let f = outputs.dotProduct(this.wordVectorUpdate.getRowVector(l2));
                            if (f <= -NeuralNetwork.MAX_EXP || f >= NeuralNetwork.MAX_EXP) {
                                continue;
                            }
                            else {
                                f = this.expTable[Math.floor((f + NeuralNetwork.MAX_EXP) *
                                    (NeuralNetwork.EXP_TABLE_SIZE / NeuralNetwork.MAX_EXP / 2))];
                            }
                            let g = (1 - currentWord.getCode(d) - f) * iteration.getAlpha();
                            outputUpdate.addVector(this.wordVectorUpdate.getRowVector(l2).product(g));
                            this.wordVectorUpdate.add(l2, outputs.product(g));
                        }
                    }
                    else {
                        for (let d = 0; d < this.parameter.getNegativeSamplingSize() + 1; d++) {
                            let target, label;
                            if (d == 0) {
                                target = wordIndex;
                                label = 1;
                            }
                            else {
                                target = this.vocabulary.getTableValue(Math.floor(Math.random() * this.vocabulary.getTableSize()));
                                if (target == 0)
                                    target = Math.floor(Math.random() * (this.vocabulary.size() - 1)) + 1;
                                if (target == wordIndex)
                                    continue;
                                label = 0;
                            }
                            let l2 = target;
                            let f = outputs.dotProduct(this.wordVectorUpdate.getRowVector(l2));
                            let g = this.calculateG(f, iteration.getAlpha(), label);
                            outputUpdate.addVector(this.wordVectorUpdate.getRowVector(l2).product(g));
                            this.wordVectorUpdate.add(l2, outputs.product(g));
                        }
                    }
                    for (let a = b; a < this.parameter.getWindow() * 2 + 1 - b; a++) {
                        let c = iteration.getSentencePosition() - this.parameter.getWindow() + a;
                        if (a != this.parameter.getWindow() && currentSentence.safeIndex(c)) {
                            let lastWordIndex = this.vocabulary.getPosition(currentSentence.getWord(c));
                            this.wordVectors.add(lastWordIndex, outputUpdate);
                        }
                    }
                }
                currentSentence = iteration.sentenceUpdate(currentSentence);
            }
        }
        /**
         * Main method for training the SkipGram version of Word2Vec algorithm.
         */
        trainSkipGram() {
            let iteration = new Iteration_1.Iteration(this.corpus, this.parameter);
            let currentSentence = this.corpus.getSentence(iteration.getSentenceIndex());
            let outputs = new Vector_1.Vector(this.parameter.getLayerSize(), 0);
            let outputUpdate = new Vector_1.Vector(this.parameter.getLayerSize(), 0);
            this.corpus.shuffleSentences(this.parameter.getSeed());
            while (iteration.getIterationCount() < this.parameter.getNumberOfIterations()) {
                iteration.alphaUpdate();
                let wordIndex = this.vocabulary.getPosition(currentSentence.getWord(iteration.getSentencePosition()));
                let currentWord = this.vocabulary.getWord(wordIndex);
                outputs.clear();
                outputUpdate.clear();
                let b = Math.floor(Math.random() * this.parameter.getWindow());
                for (let a = b; a < this.parameter.getWindow() * 2 + 1 - b; a++) {
                    let c = iteration.getSentencePosition() - this.parameter.getWindow() + a;
                    if (a != this.parameter.getWindow() && currentSentence.safeIndex(c)) {
                        let lastWordIndex = this.vocabulary.getPosition(currentSentence.getWord(c));
                        let l1 = lastWordIndex;
                        outputUpdate.clear();
                        if (this.parameter.isHierarchicalSoftMax()) {
                            for (let d = 0; d < currentWord.getCodeLength(); d++) {
                                let l2 = currentWord.getPoint(d);
                                let f = this.wordVectors.getRowVector(l1).dotProduct(this.wordVectorUpdate.getRowVector(l2));
                                if (f <= -NeuralNetwork.MAX_EXP || f >= NeuralNetwork.MAX_EXP) {
                                    continue;
                                }
                                else {
                                    f = this.expTable[Math.floor((f + NeuralNetwork.MAX_EXP) *
                                        (NeuralNetwork.EXP_TABLE_SIZE / NeuralNetwork.MAX_EXP / 2))];
                                }
                                let g = (1 - currentWord.getCode(d) - f) * iteration.getAlpha();
                                outputUpdate.addVector(this.wordVectorUpdate.getRowVector(l2).product(g));
                                this.wordVectorUpdate.add(l2, this.wordVectors.getRowVector(l1).product(g));
                            }
                        }
                        else {
                            for (let d = 0; d < this.parameter.getNegativeSamplingSize() + 1; d++) {
                                let target, label;
                                if (d == 0) {
                                    target = wordIndex;
                                    label = 1;
                                }
                                else {
                                    target = this.vocabulary.getTableValue(Math.floor(Math.random() * this.vocabulary.getTableSize()));
                                    if (target == 0)
                                        target = Math.floor(Math.random() * (this.vocabulary.size() - 1)) + 1;
                                    if (target == wordIndex)
                                        continue;
                                    label = 0;
                                }
                                let l2 = target;
                                let f = this.wordVectors.getRowVector(l1).dotProduct(this.wordVectorUpdate.getRowVector(l2));
                                let g = this.calculateG(f, iteration.getAlpha(), label);
                                outputUpdate.addVector(this.wordVectorUpdate.getRowVector(l2).product(g));
                                this.wordVectorUpdate.add(l2, this.wordVectors.getRowVector(l1).product(g));
                            }
                        }
                        this.wordVectors.add(l1, outputUpdate);
                    }
                }
                currentSentence = iteration.sentenceUpdate(currentSentence);
            }
        }
    }
    exports.NeuralNetwork = NeuralNetwork;
    NeuralNetwork.EXP_TABLE_SIZE = 1000;
    NeuralNetwork.MAX_EXP = 6;
});
//# sourceMappingURL=NeuralNetwork.js.map