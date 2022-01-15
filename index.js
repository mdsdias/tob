const { Client } = require('selfo.js');
const { NeuralNetwork } = require('@nlpjs/neural');
let client = new Client();
const config = require('./config');

client.on('ready', () => {
	console.log(`Iniciado [${client.user.tag}] pronto!.`)
});

client.on('message', msg => {
	resp = true;
    if (msg.type === "GUILD_MEMBER_JOIN") msg.channel.send(`Bem vindo (a) ${msg.author}! \n Va em <#926671205174501395> e obtenha cores!`);
	// Comandos por prefix
    if (msg.content.startsWith(config.prefix)) {
			if (msg.content.includes('ping')) {
                msg.channel.send('pong').then((msg) => {
                    setTimeout(() => {
                        msg.edit(client.ping + "ms")                    
                }, 2000)
                })
            }
            else if (msg.content.includes('avatar') || msg.content.includes('av')) {
				let user = msg.mentions.users.first() || msg.author; 
				msg.channel.send(user.avatarURL);
             }
			else if (msg.content.includes('send')){ 
				try {
					let tempresp = resp;
					if (tempresp) msg.channel.send("`Pode escrever oque quer mandar:`")
					const filter = m => !m.content.includes(`Pode escrever oque quer mandar:`);
					const collector = msg.channel.createMessageCollector(filter, { max: 1, time: 10000 });
					collector.on('collect', m => m.channel.send(m.content));
					collector.on('end', collected => { if (tempresp) { msg.channel.send("`Pronto!`") } });
				} catch (e) {
					console.log(e)
                }   }
	} else {    
        if (msg.channel
             .toString()
             .includes("929588583038353441") && 
            !msg.content.includes(config.prefix) &&
            msg.author.id === config.admID){ 
        
        }
	}
});
require('./server')();
client.login(config.token);