import {SemanticDataSet} from "../source/SemanticDataSet";
import * as Assert from "assert";

describe('SemanticDataSetTest', function() {
    describe('SemanticDataSetTest', function() {
        it('testSpearman', function() {
            let semanticDataSet = new SemanticDataSet("AnlamverRel.txt")
            Assert.equal(1.0, semanticDataSet.spearmanCorrelation(semanticDataSet))
            semanticDataSet = new SemanticDataSet("MC.txt")
            Assert.equal(1.0, semanticDataSet.spearmanCorrelation(semanticDataSet))
            semanticDataSet = new SemanticDataSet("MEN.txt")
            Assert.equal(1.0, semanticDataSet.spearmanCorrelation(semanticDataSet))
            semanticDataSet = new SemanticDataSet("MTurk771.txt")
            Assert.equal(1.0, semanticDataSet.spearmanCorrelation(semanticDataSet))
            semanticDataSet = new SemanticDataSet("RareWords.txt")
            Assert.equal(1.0, semanticDataSet.spearmanCorrelation(semanticDataSet))
            semanticDataSet = new SemanticDataSet("RG.txt")
            Assert.equal(1.0, semanticDataSet.spearmanCorrelation(semanticDataSet))
        });
    });
});
