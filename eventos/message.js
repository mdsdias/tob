const cmds = require("../config/cmds.json"),
  rn = require('../config/rn'),
  /*c*/ config = require("../config.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
function s(txt, msg) {
  if (txt == "" || !txt || txt.length >= 2000) return;
  return msg.channel.send(txt);
}

function comandosDeMembros(msg) {
  cmds.forEach((cmd) => {
    if (cmd.prefix == msg.content.toLowerCase()) {
      s(cmd.response, msg);
      return true;
    }
  });
  return false;
}
function tobInteract(msg, client) {
  r = comandosDeMembros(msg)
  if (!r) {
    if (msg.channel.type == 'dm') { }
    else if (!msg.content.toLowerCase().startsWith('tob')) return;
    console.log(`[-] Message <@${msg.author.id}> ~ ${msg.content}`)
    try {
      s(rn.genMSG(msg.content.toLowerCase(), msg, client), msg)
    }
    catch (e) {
      console.error(e)
    }
  }
}

module.exports = {
  name: "message",
  once: false,
  execute(message, client) {
    if (message.author.id == "928485485146439691") return;
    if (message.type === "GUILD_MEMBER_JOIN") {
      s(`Bem vindo (a) ${message.author}!`, message);
      return;
    }
    tobInteract(message, client);
  },
};