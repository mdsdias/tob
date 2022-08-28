const { Client, Collection } = require("selfo.js"),
  config = require("./config"),
  fs = require("fs");
var client = new Client();
const eventFiles = fs
  .readdirSync("./eventos")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./eventos/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

const triggers = fs
  .readdirSync("./triggers")
  .filter((file) => file.endsWith(".js"));
for (const file of triggers) {
  const trigger = require(`./triggers/${file}`);
  client.on("message", (...args) => trigger.execute(...args, client));
}

client.login(process.env.TOKEN)
require("./config/server")();
