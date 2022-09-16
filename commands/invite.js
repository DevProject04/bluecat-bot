import { MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder().setName("invite").setDescription("봇 초대 코드를 얻으실 수 있습니다.");
export async function execute(interaction) {
	const pingEmbed = new MessageEmbed()
		.setTitle(":mailbox_with_mail: **Invite Code!**")
		.setDescription(`[초대코드](https://projecttl.net/invite/bluecat)`)
		.setColor("BLUE")
		.setFooter({
			text: interaction.user.tag,
			iconURL: interaction.user.avatarURL()
		});
	await interaction.reply({ embeds: [pingEmbed] });
}
