import { MessageEmbed } from "discord.js";

export const name = "interactionCreate";
export async function execute(interaction) {
	if (!interaction.isCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		command.execute(interaction);
	} catch (error) {
		console.error(error);
		const errEmbed = new MessageEmbed()
			.setTitle(":octagonal_sign: Error!")
			.setDescription(`There was an error while executing this command!`)
			.setFooter({
				text: interaction.user.tag,
				iconURL: interaction.user.avatarURL()
			})
			.setColor("#FF0000");

		await interaction.reply({ embeds: [errEmbed], ephemeral: true });
	}
}
