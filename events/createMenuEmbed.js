const { EmbedBuilder } = require('discord.js');

async function createMenuEmbed(getFood, interaction) {
    await interaction.deferReply();
    try {

        //Jos ruokalistaa ei ole -> return
        if(getFood.MenusForDays == null || getFood.MenusForDays.length === 0){
            await interaction.editReply("WOmp womp eipä ollutkaan safkaa saatavilla");
            return;
        } 

        const justFood = getFood.MenusForDays[0].SetMenus || []; 

        const readyFood = []

        justFood.forEach(menu => {
            menu.Components.forEach(ruoka => {
                readyFood.push(ruoka)
            })
        });

        const readyFoodText = readyFood.length > 0 ? readyFood.join("\n") : "EI safkaa, syö kaivonkansi";
        const foodImage = readyFood.length > 0
        ? 'https://media.tenor.com/1a6RFI10-oYAAAAe/butter-dog.png' //ButterDog
        : "https://preview.redd.it/new-pc-ignore-pablo-v0-2r2qz3bu303d1.jpeg?width=1080&auto=webp&s=fa719897ef43fe6ac8436923d26697232270caab" //Pablo

        const kareliaEmbed = new EmbedBuilder()
            .setTitle('Ruokalista')
            .setURL(getFood.RestaurantUrl)
            .setImage(foodImage)
            .setColor("#FFA500")
            .addFields(
                { name: getFood.RestaurantName, value: readyFoodText  },
                { name: "Ruoka-aika", value: getFood.MenusForDays[0].LunchTime || "MAaan IDK" }
            )

        await interaction.editReply({ embeds: [kareliaEmbed] })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {createMenuEmbed}