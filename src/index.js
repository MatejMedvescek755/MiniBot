require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const token = process.env.TOKEN;
const port = process.env.PORT || 4000;

const app = express();
const bot = new TelegramBot(token, { polling: true });

let balance = 1000;

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to the gambling bot!');
});

bot.onText(/\/balance/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Your current balance is $1000');
});

bot.onText(/\/bet (.+)/, (msg, match) => {
    const amount = match[1];
    if(amount === "all"){
        bot.sendMessage(msg.chat.id, `You have placed a bet of $${balance}`);
        balance = 0;
    }else if (isNaN(amount)) {
        bot.sendMessage(msg.chat.id, 'Please specify a valid bet amount!');
    } else {
        bot.sendMessage(msg.chat.id, `You have placed a bet of $${amount}`);
        balance -= amount
    }
});



app.get('/', (req, res) => {
    res.send('Telegram bot is running');
});


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
});