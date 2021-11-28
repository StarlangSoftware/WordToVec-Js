import {Corpus} from "nlptoolkit-corpus/dist/Corpus";
import {NeuralNetwork} from "../dist/NeuralNetwork";
import {WordToVecParameter} from "../dist/WordToVecParameter";

describe('NeuralNetworkTest', function() {
    describe('NeuralNetworkTest', function() {
        it('testTrainEnglishCBow', function() {
            let english = new Corpus("english-similarity-dataset.txt");
            let parameter = new WordToVecParameter();
            parameter.setCbow(true);
            let neuralNetwork = new NeuralNetwork(english, parameter);
            neuralNetwork.train();
        });
        it('testTrainEnglishSkipGram', function() {
            let english = new Corpus("english-similarity-dataset.txt");
            let parameter = new WordToVecParameter();
            parameter.setCbow(false);
            let neuralNetwork = new NeuralNetwork(english, parameter);
            neuralNetwork.train();
        });
        it('testTrainTurkishCBow', function() {
            let turkish = new Corpus("turkish-similarity-dataset.txt");
            let parameter = new WordToVecParameter();
            parameter.setCbow(true);
            let neuralNetwork = new NeuralNetwork(turkish, parameter);
            neuralNetwork.train();
        });
        it('testTrainTurkishSkipGram', function() {
            let turkish = new Corpus("turkish-similarity-dataset.txt");
            let parameter = new WordToVecParameter();
            parameter.setCbow(false);
            let neuralNetwork = new NeuralNetwork(turkish, parameter);
            neuralNetwork.train();
        });
    });
});
