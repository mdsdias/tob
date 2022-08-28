module.exports = {
    name: "help",
    aliases: ["ajuda", "h"],
    description: "Mostra isso.",
    usage: "<None : Comando>",
    execute(message, args, client) {
        let msg = "Loading...";
        if (args.length) {
            let usage;
            client.commands.forEach((command) =>
            {
                if (command.name == args[0]) {
                    usage = command.usage
                    if (usage) msg = `\`${client.prefix}${command.name} ${usage}\``;
                    else msg = `\`${client.prefix}${command.name}\``;
                };
            })
            message.channel.send(msg)
        } else {
            msg += '*\`\`\`';
            client.commands.forEach((command) => {
                msg += `${command.name}  -  ${command.description}\n`
            })
            msg += '\`\`\`*'
            message.channel.send(msg);
        }
    },
};