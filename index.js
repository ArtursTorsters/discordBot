const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config()

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

// Initialize the commands collection
client.commands = new Collection();

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Load commands into the client's command collection
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Event triggered when a message is created
client.on(Events.MessageCreate, message => {
    console.log(`Message received: ${message.content}`); // Log received message

    if (message.author.bot) return; // Ignore messages from bots

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

// Event triggered when an interaction is created
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// Log in the bot with your token from the .env file
client.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot successfully logged in.'))
    .catch(err => console.error('Failed to log in:', err));
