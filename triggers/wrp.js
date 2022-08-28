module.exports = {
  execute(message, client) {
    if (message.author.id == "928485485146439691") return;
    let mf = message.mentions.users.first();
    try {
      if (mf.id == "928485485146439691") {
        if (message.embeds[0] && !config.sendedBolsa) {
          try {
            let emb = message.embeds[0];
            if (message.author.id != "635610722994356275") return;
            if (emb.fields[0].name != '💰 | Valor da bolsa') return;
            if (message.channel.id == config.chatBolsa) {
              try {
                if (+emb.fields[0].value.split('.')[0] >= 70) {
                  client.channels.get('994780936753389648').send('Bolsa está em ' + (+emb.fields[0].value.split('.')[0]) + "% <@&994084171486068868>")
                  config.sendedBolsa = true;
                }
              } catch (e) {  }
            }
          } catch (e) {  }
        }
      }
    } catch (e) { }
  },
};