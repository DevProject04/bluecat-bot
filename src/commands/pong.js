const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pong')
		.setDescription('You can ping pong with my bot!'),
	async execute(interaction) {
        const pingEmbed = new MessageEmbed()
            .setTitle(":ping_pong: Ping!")
            .setDescription(`${interaction.client.ws.ping}ms`)
            .setColor("BLUE")
            .setFooter(interaction.user.tag, interaction.user.avatarURL());
		await interaction.reply({ embeds: [pingEmbed] });
	},
};