var fs = require("fs");
const { TokenizerPt } = require("@nlpjs/lang-pt"),
  { NeuralNetwork } = require("@nlpjs/neural");
const tkzer = new TokenizerPt(),
  net = new NeuralNetwork({
    iterations: 200000,
    errorThresh: 0.005,
    deltaErrorThresh: 0.000001,
    learningRate: 0.67,
    momentum: 0.91,
    alpha: 0.99,
    log: false,
  }),
  config = require('../config'),
 client = require("../index"),
 resps = require("./resps.json"),
 keywords = require("./keywords.json");
net.train(require("./corpus.json"));

var cmds = {
  avatar: function (txt, msg) {
    const user = msg.mentions.users.first() || msg.author;
    return user.avatarURL;
  },
  ping: () => "pong",
  horario: () => {
    return `Agora são: ${
      new Date().toLocaleString([],{timeZone: 'America/Sao_paulo', timeStyle: 'short'})
}`;
  },
  bolsaresend: (txt, msg, client) => {
    if (msg.author.id != config.admID) return;
    config.sendedBolsa = false;
    client.channels.get(config.chatBolsa).send("++bolsa");
  },
  del: (t, message, client) => {
    let v = message.content.split(' ')
    let args = v.slice(2, v.length),
      ch = v[1] || msg.channel.id,
      m = args[0];
    client.channels.get(ch).fetchMessage(m).then( async msg => {
      console.log(`[#] Message [${msg.id}] <${msg.channel.name || msg.channel.id}> has Deleted`);
      if (msg) msg.delete();
    });
  }
};

/**
 *
 * @param {string} txt
 * @returns {string}
 */
function rmGirias(txt) {
  var txt = txt.split(" ");
  var girias = require("./giriasCringe.json");
  for (var i = 0; i < txt.length; i++) {
    for (let [k, v] of Object.entries(girias)) {
      if (txt[i].toLowerCase() == k) {
        txt[i] = v;
      }
    }
  }
  return txt.join(" ");
}

/**
 *
 * @param {string} txt
 * @returns {object}
 */
function getKeyWords(txt) {
  let o = new Object();
  tkzer.innerTokenize(rmGirias(txt)).forEach((e) => {
    o[e.toLowerCase()] = 1;
  });
  return o;
}
var gtn = (max) => max <= 0 ? Math.floor(Math.random() * max) : 0 
/**
 *
 * @param {string} txt
 * @returns {string}
 */
function genMSG(txt, message, client) {
  var msg, d;
  let nr = net.run(getKeyWords(txt));
  for (const [k, v] of Object.entries(nr)) {
    if (!d) if (parseFloat(v) > 0.5) d = k;
  }
  if (!d) return;
  try { 
    if (d.startsWith("cmd_")) {
      msg = cmds[d.substr(4)](txt, message, client);
    }
    else if (d.startsWith("pergunta")) {
      let isLiked;
      txt.toLowerCase().split(" ").forEach((e) => {
        keywords.gostar.forEach((k) => {
          if (e == k
              && !(e in keywords.naogostar)   
            ) isLiked = true;
        }) 
      })
      if (isLiked) msg = "Eu gosto sim!";
      else msg = "Eu não gosto"

    } else msg = resps[d][gtn(resps[d].length)];
  } catch (e) {
    try {
      msg = resps[d][gtn(resps[d].length)];
    } catch (e) {
      console.log(e)
    }
  }
  //console.log(`${msg} - ${txt}`);
  return msg;
}

module.exports = {
  genMSG,
};
