# Telegram Gambling Bot

A simple Telegram bot built with Node.js and Express.js. This bot supports basic commands for an online gambling context, including checking balance, placing bets, and adding to the balance.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup and Installation](#setup-and-installation)
3. [Running the Bot](#running-the-bot)
4. [Available Commands](#available-commands)
5. [Deployment](#deployment)
6. [Contributing](#contributing)
7. [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

You will also need a Telegram bot token, which you can obtain from [BotFather](https://core.telegram.org/bots#botfather).

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/telegram-gambling-bot.git
   cd telegram-gambling-bot
   ```
2. **Install dependancies:**
    Using npm:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**
    Create a .env file in the root directory of the project and add the following line, replacing YOUR_TELEGRAM_BOT_TOKEN with your actual bot token:
    ```env
    TOKEN=YOUR_TELEGRAM_BOT_TOKEN
    PORT=4000
    ```
## Running the Bot

To run the Telegram bot locally, follow these steps:

1. **Start the Bot:**

   Open a terminal and navigate to the root directory of the project where your `index.js` file is located. Run the following command to start the bot:

   ```bash
   node index.js
   ```
    This will start the bot and begin polling for updates from Telegram.

2. ** Access the Web Server:**
    The bot also runs a simple web server to confirm it's running. You can access this by visiting the following URL in your browser:
    ```
    http://localhost:4000
    ```
    You should see a message indicating that the Telegram bot is running.
3. **Test the Bot:**
    -Open Telegram and search for your bot using the username you set up with BotFather.
    -Start a chat with your bot and use the following commands to interact with it:

        -/start - Sends a welcome message.
        -/balance - Displays your current balance.
        -/bet [amount] - Places a bet of the specified amount. Use all to bet the entire balance.
        -/add [amount] - Adds the specified amount to your balance.
        -/help -gives you summary of all the commands

4. **Troubleshooting:**
    -If the bot is not responding as expected, check the terminal for error messages.
    -Ensure that your bot token is correctly set in the .env file and that your internet connection is stable.
    -Verify that no other process is using port 4000 or 3000 if you encounter port conflicts.