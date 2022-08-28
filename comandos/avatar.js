module.exports = {
    name: "avatar",
    aliases: ["av", "avatar"],
    description: "Usado para ver o seu/user avatar",
    args: false,
    usage: "<User ou nada>",
    execute(msg, args)
    {
        let user = msg.mentions.users.first() || msg.author;
        msg.channel.send(user.avatarURL);
    },
};