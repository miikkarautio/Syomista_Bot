const {  ButtonStyle, SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ruoka')
        .setDescription('Gives options of restaurants to pick from'),
    async execute(interaction) {
        
        const karelia = new ButtonBuilder()
            .setCustomId('karelia')
            .setLabel('Karelia restaurants')
            .setStyle(ButtonStyle.Primary);

        const uef = new ButtonBuilder()
            .setCustomId('uef')
            .setLabel('UEF restaurants')
            .setStyle(ButtonStyle.Primary);
        
        const bothCampuses = new ButtonBuilder()
            .setCustomId('both')
            .setLabel('Both campuses')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
            .addComponents(karelia, uef, bothCampuses)
        
        await interaction.reply({
            content: `Jokos ois nälkä? Hm?`,
            components: [row],
        });
    },
    
};