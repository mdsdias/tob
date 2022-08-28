var choose = arr => arr[Math.floor(Math.random() * arr.length)],
  chatsBolsa= ["994055862572306446", '994055820524396634', "994055768477278220", "994051213312143450"];
module.exports = {
  token: process.env.TOKEN,
  admID: "783058100482867234",
  manutencao: false,
  sendedBolsa: false,
  chatBolsa: choose(chatsBolsa),
  ready: false,
};