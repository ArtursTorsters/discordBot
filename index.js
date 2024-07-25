

    const { Client, Events, GatewayIntentBits, Message } = require('discord.js');
require('dotenv').config(); // Load environment variables from .env file

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent // Ensure this intent is included to read message content
    ]
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Event triggered when a message is created
client.on(Events.MessageCreate, message => {
    console.log(`Message received: ${message.content}`); // Log received message
    if (message.mentions.has(client.user)) {
                message.reply("Pong!");
            }
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if the message mentions the bot
    if (message.mentions.has(client.user)) {
        message.reply(`Hello ${message.author.username}! How can I assist you today?`);
        return; // Stop further processing
    }

    // Respond to greetings
    const content = message.content.toLowerCase();
    if (content === 'hello' || content === 'hi' || content === 'hey') {
        message.channel.send(`Hello ${message.author.username}! How can I help you today?`);
    }
});

// Log in the bot with your token from the .env file
client.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot successfully logged in.'))
    .catch(err => console.error('Failed to log in:', err));
