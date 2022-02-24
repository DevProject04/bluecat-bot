const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('API 핑 지연을 확인합니다.'),
	async execute(interaction) {
        const pingEmbed = new MessageEmbed()
            .setTitle(":ping_pong: **Pong!**")
            .setDescription(`${interaction.client.ws.ping}ms`)
            .setColor("BLUE")
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });
		await interaction.reply({ embeds: [pingEmbed] });
	},
};