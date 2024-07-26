const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('Spits out random quotes'),
    async execute(interaction) {
        try {
            const fetch = await import('node-fetch').then(module => module.default);
            const response = await fetch('https://dummyjson.com/quotes/random');
            const data = await response.json();
            const quote = data.quote;

            await interaction.reply(quote);
        } catch (error) {
            console.error('Error fetching quote:', error);
            await interaction.reply('Failed to fetch a quote. Please try again later.');
        }
    },
};
