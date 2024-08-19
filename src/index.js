require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { init, updateUser, getUserData } = require('./firebase');

const token = process.env.TOKEN;
const port = process.env.PORT || 4000;

const app = express();
const bot = new TelegramBot(token, { polling: true });

const helpText = `
/start - Start interacting with the bot.
/help - Show this help message.
/balance - Check your current balance and placed bet amount.
/number <number> - Place a bet on a specific number (0-36).
/bet <amount> - Place a bet with a specified amount or 'all' to bet all your balance.
/add <amount> - Add a specified amount to your balance.
/spin - Spin the wheel and see if you win based on your bet.
`;


//TODO  implement firebase to store user data
let balance = 1000;
let betNumber = null;
let betAmount = 0;


bot.onText(/\/start/, (msg) => {
    init(msg.chat.id)
    bot.sendMessage(msg.chat.id, 'TEST: Welcome to the gambling bot!');
    balance = 1000, 
    betNumber = null;
    betAmount = 0;
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, helpText);
});

bot.onText(/\/spin/, (msg)=>{
    console.log(msg)
    if(betNumber === null){
        bot.sendMessage(msg.chat.id, `TEST: You didn't place any bet!`);
        return;
    }
    bot.sendDocument(msg.chat.id, 'https://media.giphy.com/media/wScuGYwe1eDvjeNYWD/giphy.gif');
    const winningNumber = Math.floor(Math.random() * 37);

    if(betNumber == winningNumber){
        bot.sendMessage(msg.chat.id, `TEST: Congratulations! You won $${betAmount * 36}`);
        updateUser(msg.chat.id, {balance: balance + betAmount * 36, betNumber: null, betAmount: 0});
        //TODO remove
        balance += betAmount * 36;
        betNumber = null;
    }else{
        bot.sendMessage(msg.chat.id, `TEST: Tough luck! You lost $${betAmount} \n The winning number was ${winningNumber}`);
        updateUser(msg.chat.id, {balance: balance, betNumber: null, betAmount: 0});
        //TODO remove
        betNumber = null;
    }
    betAmount = 0;
});

bot.onText(/\/balance/, (msg) => {
    bot.sendMessage(msg.chat.id, `TEST: Your current balance is ${balance} \n You have placed a bet of $${betAmount}`);
});

bot.onText(/\/number\s*(\d*)/, (msg, match) => {
    const numberArg = match[1].trim();

    if (numberArg === "") {
        bot.sendMessage(msg.chat.id, "TEST: Please provide a number after the /number command.");
        return;
    }

    const number = parseInt(numberArg, 10);

    if (isNaN(number) || number < 0 || number > 36) {
        bot.sendMessage(msg.chat.id, "TEST: Please specify a valid number between 0 and 36!");
        return;
    }

    betNumber = number;
    bot.sendMessage(msg.chat.id, `TEST: You have placed a bet on ${betNumber}`);
});


bot.onText(/\/bet (.+)/, (msg, match) => {
    const amount = match[1];
    if(amount === "all"){
        bot.sendMessage(msg.chat.id, `TEST: You have placed a bet of $${balance}`);
        betAmount += balance;
        balance = 0;
    }else if (isNaN(amount)) {
        bot.sendMessage(msg.chat.id, 'TEST: Please specify a valid bet amount!');
    } else {
        if(amount > balance){
            bot.sendMessage(msg.chat.id, `TEST: You don't have enough balance to place a bet of $${amount}`);
            return;
        }else{
            bot.sendMessage(msg.chat.id, `TEST: You have placed a bet of $${amount}`);
            updateUser(msg.chat.id, {balance: balance - amount, betAmount: amount});
            //TODO remove
            balance -= amount
            betAmount = amount;
        }
    }
});

bot.onText(/\/add (.+)/, (msg, match) => {
    console.log(msg);
    const amount = parseFloat(match[1]);
    userData = getUserData(msg.chat.id);
    if (isNaN(amount)) {
        bot.sendMessage(msg.chat.id, 'TEST: Please specify a valid amount!');
    } else {
        updateUser(msg.chat.id, {balance: balance + amount});
        balance += amount;
        bot.sendMessage(msg.chat.id, `TEST: You have added $${amount} to your balance`);
    }
});


app.get('/', (req, res) => {
    res.send('Telegram bot is running');
});


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
});

bot.on('polling_error', (error) => {
    console.error('Polling error occurred:', error);
});
