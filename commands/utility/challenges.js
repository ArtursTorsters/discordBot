const { challenges} = require('./challenges.json');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge')
        .setDescription('Get a random coding challenge'),
    async execute(interaction) {
        // Get a random challenge
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];

        // Send the random challenge as a response
        await interaction.reply(`**${randomChallenge.name}**\n${randomChallenge.url}`);
    },
};