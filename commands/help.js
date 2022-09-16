import { readdirSync } from "fs";
import { MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder().setName("help").setDescription("봇 커맨드를 확인하실 수 있습니다.");
export function execute(interaction) {
	const embed = new MessageEmbed().setTitle(":information_source: **Help!**").setDescription("명령어 리스트 입니다.").setColor("BLUE").setFooter({
		text: interaction.user.tag,
		iconURL: interaction.user.avatarURL()
	});

	const commandFiles = readdirSync("./commands/").filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		embed.addFields(`**${command.data.name}**`, `${command.data.description}`, true);
	}

	return void interaction.reply({ embeds: [embed] });
}
