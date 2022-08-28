const { Client, Collection } = require("selfo.js"),
    config = require("./config"),
    cmds = require("./config/cmds.json"),
    ia = require('./config/ia'),
    fs = require("fs"),
    ss = require("./config/messages"),
    corpus = require("./config/corpus.json");
let resps = require('./config/resps.json');
let client = new Client();
client.commands = new Collection();
client.prefix = config.prefix;

client.on("ready", () => {
    console.log(`Iniciado [${client.user.tag}] pronto!.`)
    ia.trainIA(corpus); // ia treinor
});

const commandFiles = fs
    .readdirSync("./comandos")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./comandos/` + file);
    client.commands.set(command.name, command);
}

client.on("message", (message) => {
    if (message.type === "GUILD_MEMBER_JOIN") {
        ss.mchs(
            `Bem vindo (a) ${message.author}! \n Va em <#926671205174501395> e obtenha cores!`
            , message
        );
        return;
    }

    if (message.author.bot || client.user == message.author) return;

    if (!message.content.startsWith(client.prefix)) {

        if (message.channel.type == "dm") {
            ss.mchs(ia.genMSG(message.content, resps = resps, context = ia.getContext(message)), message);
        } else if (message.mentions.users.first() == client.user) {
            ss.mchs(ia.genMSG(message.content, resps = resps, context = ia.getContext(message)), message);
        }
        else {
            cmds.forEach((cmd) => {
                if (cmd.prefix == message.content.toLowerCase()) ss.mchs(cmd.response, message);
            });
        }
    };
    const args = message.content.slice(client.prefix.length).split(/ +/);  // client.prefix.length pra qualquer coisa cm 3 letras ir "noc.av"
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

    // If command exist
    if (!command) return;

    // Check if command can be executed in DM
    if (command.guildOnly && message.channel.type !== "text") {
        return message.reply("Este comando é pra servers.");
    }

    // Check if args are required
    if (command.args && !args.length) {
        let reply = `Tu esqueceu de algo ein, ${message.author}!`; 0

        if (command.usage) {
            reply += `\nJeito de usar: \`${client.prefix}${command.name} ${command.usage}\``;
        }

        return ss.mchs(reply, message);
    }
    command.execute(message, args, client);
});

require("./config/server")();
client.login(config.token);
