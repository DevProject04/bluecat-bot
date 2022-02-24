const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { botOwner } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("봇을 다시 로드 하실 수 있습니다."),
    async execute(interaction) {
        

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        if (interaction.user.id !== botOwner) {
            const errorEmbed = new MessageEmbed()
                .setTitle(":octagonal_sign: Error!")
                .setDescription(`You're not bot owner!`)
                .setColor("RED")
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });
		    
            return await interaction.reply({ embeds: [errorEmbed] });
        }

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
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

		await interaction.reply({ embeds: [reloadEmbed] });
    }
}