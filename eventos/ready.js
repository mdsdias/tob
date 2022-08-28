const config = require("../config");

module.exports = {
  name: "ready",
  once: false,
  execute(client) {
    console.log(`Iniciado [${client.user.tag}] pronto!.`);
    client.channels.get(config.chatBolsa).send("++bolsa");
    client.setInterval(() => {
      config.sendedBolsa = false;
      client.channels.get(config.chatBolsa).send("++bolsa");
    }, (31 * 60 * 1000));
    config.ready = true;
  },
};
