var express = require('express');
var router = express.Router();
const axios = require("axios")
const { Telegraf } = require('telegraf');
const bot = new Telegraf('6313988176:AAG37B9kZ8HT6GdERVbuMkxQKmQe9saY_Gc');
bot.on("message", ctx => {
  const roule = /^(0x)[a-zA-Z0-9]{40}\b/
  if (ctx.message.text.match(roule)) {
    console.log(ctx.message.text);
    axios.get(`https://api.dexscreener.com/latest/dex/tokens/${ctx.message.text}`).then(res => {
      console.log(res.data);
      bot.telegram.sendMessage(ctx.chat.id, JSON.stringify(res.data), {
      })
    })

  }

})
bot.command('start', ctx => {
  console.log(ctx);

  bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
  })
})



bot.launch();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
