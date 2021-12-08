const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { botOwner } = require('../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("You can reload my bot!"),
    async execute(interaction) {
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

        if (interaction.user.id === botOwner) {
            for (const file of commandFiles) {
                const command = require(`./${file}`);

                console.log(`Unloaded ${command.data.name}!`);
                delete require.cache[require.resolve(`./${file}`)];
	            interaction.client.commands.delete(commandFiles);
                
                console.log(`Loaded ${command.data.name}!`);
                await interaction.client.commands.set(command.data.name, command);
            }

            const reloadEmbed = new MessageEmbed()
                .setTitle(":repeat: Reload Complete!")
                .setDescription(`All commands successful reloaded!`)
                .setColor('BLUE')
                .setFooter(interaction.user.tag, interaction.user.avatarURL());

		    await interaction.reply({ embeds: [reloadEmbed] });
        } else {
            const errorEmbed = new MessageEmbed()
                .setTitle(":octagonal_sign: Error!")
                .setDescription(`You're not bot owner!`)
                .setColor("#FF0000")
                .setFooter(interaction.user.tag, interaction.user.avatarURL());

		    await interaction.reply({ embeds: [errorEmbed] });
        }
    }
}