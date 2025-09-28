const { Events, MessageFlags } = require('discord.js');
const { getFoodInformation } = require("../api.js");
const { createMenuEmbed } = require("./createMenuEmbed.js");


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                } else {
                    await interaction.reply({ content: 'There was and error while executing this command!', flags: MessageFlags.Ephemeral });
                }
            }
        } else if (interaction.isButton()) {
            if (interaction.customId === 'karelia') {
                const getFood = await getFoodInformation("0447")
                createMenuEmbed(getFood, interaction)
            } else if (interaction.customId === 'uef') {
                const getFood = await getFoodInformation("0433")
                createMenuEmbed(getFood, interaction)
            } else if (interaction.customId === 'both'){
                const getFood = await getFoodInformation("3087")
                createMenuEmbed(getFood, interaction)
            }
        }
    },
};