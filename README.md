# Discord Bot

Discord Bot is a simple Discord bot that responds to commands with random coding challenges and random quotes fetched from https://dummyjson.com  and interacts with users in various ways.

## Features

- Responds to greetings.
- Replies when mentioned.
- Provides random coding challenges from a predefined list.
- Provides random quote.

Can add new slash commands https://discordjs.guide/creating-your-bot/

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/)

## Setup

- git clone https://github.com/yourusername/repo
- cd project
- npm install
- Create a .env file in the root directory of your project and add your Discord bot token
- Run the deploy-commands.js script to register your bot's slash commands with Discord
- Run the index.js script to start the bot

## Commands

- /challenge: Provides a random coding challenge from the predefined list.
- /quotes: Provides a random quote from https://dummyjson.com 
- /user: Provides a user information

The bot will respond to common greetings such as "hello", "hi", and "hey".