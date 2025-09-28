const { EmbedBuilder } = require('discord.js');

async function createMenuEmbed(getFood, interaction) {
    await interaction.deferReply();
    try { 

        const justFood = getFood.MenusForDays[0].SetMenus

        const readyFood = []

        justFood.forEach(menu => {
            menu.Components.forEach(ruoka => {
                readyFood.push(ruoka)
            })
        });

        const kareliaEmbed = new EmbedBuilder()
            .setTitle(`Ruokalista `)
            .setURL(getFood.RestaurantUrl)
            .setImage('https://media.tenor.com/1a6RFI10-oYAAAAe/butter-dog.png')
            .setColor("#FFA500")
            .addFields(
                { name: getFood.RestaurantName, value: readyFood.join("\n") },
                { name: "Ruoka-aika", value: getFood.MenusForDays[0].LunchTime }
            )

        await interaction.editReply({ embeds: [kareliaEmbed] })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {createMenuEmbed}