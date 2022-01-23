module.exports = {
    name: "ping",
    description: "Ver o ping do bot!",
    args: false,
    execute(msg, args, client) {
        msg.channel.send(client.ping + "ms");
    },
};