var fs = require('fs');
const { TokenizerPt } = require('@nlpjs/lang-pt'),
    { NeuralNetwork } = require('@nlpjs/neural');
const tkzer = new TokenizerPt(),
    net = new NeuralNetwork({
        iterations: 200000,
        errorThresh: 0.00005,
        deltaErrorThresh: 0.000001,
        learningRate: 0.6,
        momentum: 0.9,
        alpha: 0.99,
        log: true,
    });
var trained = false;

/** 
 * @param {string} msg 
 * @returns {array}
 */
function getContext(msg)
{
    return msg.channel.messages.array();
}

/**
 * 
 * @param {string} txt
 * @returns {object}
 */
function getKeyWords(txt)
{
    let tempobj = new Object();
    keyarr = tkzer.innerTokenize(txt);
    keyarr.forEach(e =>
    {
        tempobj[e.toLowerCase()] = 1;
    });
    return tempobj;
}

/**
 * 
 * @param {number} max 
 * @returns {number}
 */
function getRandomNumber(max){
    if (max < 0 || max == 0 ) return 0;  
    return Math.floor(Math.random() * max);
}

function trainIA(corpus){ 
    if (trained) return;
    net.train(corpus)
    trained = true;
}

/**
 * 
 * @param {string} txt 
 * @param {object} context
 * @param {object} resps
 * @returns {string}
 */
function genMSG(txt, resps = [], context)
{
    let msg = '{ERRO}: Bugou tudo aqui, ve as logs seu programador ruim',
        tmsg = '{ERRO}: Bugou tudo aqui, ve as logs seu programador ruim',
        d = undefined;
    let keys = getKeyWords(txt);
    let neuralresponse = net.run(keys);
    for (const [key, value] of Object.entries(neuralresponse))
    {
        console.log(key + ': ' + value)
        if (d == undefined) if (parseFloat(value) > 0.5) d = key;
    };
    if (d == undefined) return;
    let e = getRandomNumber(resps[d].length)
    console.log(resps)
    msg = resps[d][e];
    console.log(msg)
    if (tmsg == msg) return msg
    return msg;
}

/**
 * 
 * @param {string} inputTxt 
 * @param {string} outputTxt 
 * @param {filename} toWrite
 * @returns {string}
 */
function addCorpusResponse (toWrite, inputTxt, outputTxt) {
    var data;
    let input = getKeyWords(inputTxt),
        resposta = getKeyWords(outputTxt);
    data = {
        input: input,
        outputTxt: resposta,
    };
    fs.writeFile(toWrite, JSON.stringify(data), (err) => { if(err)console.error});
}

module.exports = {
    getContext,
    genMSG,
    addCorpusResponse,
    trainIA
};