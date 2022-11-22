import {Corpus} from "nlptoolkit-corpus/dist/Corpus";
import {NeuralNetwork} from "../dist/NeuralNetwork";
import {WordToVecParameter} from "../dist/WordToVecParameter";
import {SemanticDataSet} from "../dist/SemanticDataSet";
import {VectorizedDictionary} from "nlptoolkit-dictionary/dist/Dictionary/VectorizedDictionary";
import {WordComparator} from "nlptoolkit-dictionary/dist/Dictionary/WordComparator";

describe('NeuralNetworkTest', function() {
    describe('NeuralNetworkTest', function() {
        it('testTrainEnglishCBow', function() {
            let english = new Corpus("english-xs.txt")
            let mc = new SemanticDataSet("MC.txt")
            let rg = new SemanticDataSet("RG.txt")
            let ws = new SemanticDataSet("WS353.txt")
            let men = new SemanticDataSet("MEN.txt")
            let mturk = new SemanticDataSet("MTurk771.txt")
            let rare = new SemanticDataSet("RareWords.txt")
            let parameter = new WordToVecParameter()
            parameter.setCbow(true)
            let neuralNetwork = new NeuralNetwork(english, parameter)
            let dictionary = neuralNetwork.train()
            let mc2 = mc.calculateSimilarities(dictionary)
            console.log("(" + mc.size() + ") " + mc.spearmanCorrelation(mc2))
            let rg2 = rg.calculateSimilarities(dictionary)
            console.log("(" + rg.size() + ") " + rg.spearmanCorrelation(rg2))
            let ws2 = ws.calculateSimilarities(dictionary)
            console.log("(" + ws.size() + ") " + ws.spearmanCorrelation(ws2))
            let men2 = men.calculateSimilarities(dictionary)
            console.log("(" + men.size() + ") " + men.spearmanCorrelation(men2))
            let mturk2 = mturk.calculateSimilarities(dictionary)
            console.log("(" + mturk.size() + ") " + mturk.spearmanCorrelation(mturk2))
            let rare2 = rare.calculateSimilarities(dictionary)
            console.log("(" + rare.size() + ") " + rare.spearmanCorrelation(rare2))
        });
        it('testWithWordVectors', function() {
            let dictionary = new VectorizedDictionary(WordComparator.ENGLISH, "vectors-english-xs.txt")
            let mc = new SemanticDataSet("MC.txt")
            let rg = new SemanticDataSet("RG.txt")
            let ws = new SemanticDataSet("WS353.txt")
            let men = new SemanticDataSet("MEN.txt")
            let mturk = new SemanticDataSet("MTurk771.txt")
            let rare = new SemanticDataSet("RareWords.txt")
            let mc2 = mc.calculateSimilarities(dictionary)
            console.log("(" + mc.size() + ") " + mc.spearmanCorrelation(mc2))
            let rg2 = rg.calculateSimilarities(dictionary)
            console.log("(" + rg.size() + ") " + rg.spearmanCorrelation(rg2))
            let ws2 = ws.calculateSimilarities(dictionary)
            console.log("(" + ws.size() + ") " + ws.spearmanCorrelation(ws2))
            let men2 = men.calculateSimilarities(dictionary)
            console.log("(" + men.size() + ") " + men.spearmanCorrelation(men2))
            let mturk2 = mturk.calculateSimilarities(dictionary)
            console.log("(" + mturk.size() + ") " + mturk.spearmanCorrelation(mturk2))
            let rare2 = rare.calculateSimilarities(dictionary)
            console.log("(" + rare.size() + ") " + rare.spearmanCorrelation(rare2))
        });
        it('testTrainEnglishSkipGram', function() {
            let english = new Corpus("english-xs.txt");
            let mc = new SemanticDataSet("MC.txt")
            let rg = new SemanticDataSet("RG.txt")
            let ws = new SemanticDataSet("WS353.txt")
            let men = new SemanticDataSet("MEN.txt")
            let mturk = new SemanticDataSet("MTurk771.txt")
            let rare = new SemanticDataSet("RareWords.txt")
            let parameter = new WordToVecParameter()
            parameter.setCbow(false)
            let neuralNetwork = new NeuralNetwork(english, parameter)
            let dictionary = neuralNetwork.train()
            let mc2 = mc.calculateSimilarities(dictionary)
            console.log("(" + mc.size() + ") " + mc.spearmanCorrelation(mc2))
            let rg2 = rg.calculateSimilarities(dictionary)
            console.log("(" + rg.size() + ") " + rg.spearmanCorrelation(rg2))
            let ws2 = ws.calculateSimilarities(dictionary)
            console.log("(" + ws.size() + ") " + ws.spearmanCorrelation(ws2))
            let men2 = men.calculateSimilarities(dictionary)
            console.log("(" + men.size() + ") " + men.spearmanCorrelation(men2))
            let mturk2 = mturk.calculateSimilarities(dictionary)
            console.log("(" + mturk.size() + ") " + mturk.spearmanCorrelation(mturk2))
            let rare2 = rare.calculateSimilarities(dictionary)
            console.log("(" + rare.size() + ") " + rare.spearmanCorrelation(rare2))
        });
        it('testTrainTurkishCBow', function() {
            let turkish = new Corpus("turkish-xs.txt")
            let av = new SemanticDataSet("AnlamverRel.txt")
            let parameter = new WordToVecParameter()
            parameter.setCbow(true)
            let neuralNetwork = new NeuralNetwork(turkish, parameter)
            let dictionary = neuralNetwork.train()
            let av2 = av.calculateSimilarities(dictionary)
            console.log("(" + av.size() + ") " + av.spearmanCorrelation(av2))
        });
        it('testTrainTurkishSkipGram', function() {
            let turkish = new Corpus("turkish-xs.txt")
            let av = new SemanticDataSet("AnlamverRel.txt")
            let parameter = new WordToVecParameter()
            parameter.setCbow(false)
            let neuralNetwork = new NeuralNetwork(turkish, parameter)
            let dictionary = neuralNetwork.train()
            let av2 = av.calculateSimilarities(dictionary)
            console.log("(" + av.size() + ") " + av.spearmanCorrelation(av2))
        });
    });
});
