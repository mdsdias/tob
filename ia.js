const config = require('./config');
const {
    TokenizerPt,
    SentimentPt,
    NormalizerPt
} = require('@nlpjs/lang-pt')
const {
    NeuralNetwork
} = require('@nlpjs/neural');
const corpus = config.corpus;
const tkzer = new TokenizerPt;
const norm = new NormalizerPt;
const net = new NeuralNetwork({
    learningRate: 0.01
});
net.train(corpus);


var redeNeural = (msg) => {
    if (!msg.length) return;

    function _simply(String txt) {
        return tkzer.innerTokenize(norm.normalize(txt));
    };

    function _toAnaz() {
        _simply()
    } 

    function _redeAnalize(input) {
        return net.run(input)
    }

    function _msg() {

    }

    return _msg(msg)
}
console.log(redeNeural("Coe seu Bobãokkkkkk"))
module.exports.default = redeNeural;