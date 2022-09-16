import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

function createTimeStamp(user) {
	return `${user.createdAt.getMonth()}/${user.createdAt.getDate()}/${user.createdAt.getFullYear()}`;
}

function joinTimeStamp(member) {
	return `${member.joinedAt.getMonth()}/${member.joinedAt.getDate()}/${member.joinedAt.getFullYear()}`;
}

export const data = new SlashCommandBuilder()
	.setName("userinfo")
	.setDescription("유저 정보를 확인 할 수 있습니다.")
	.addUserOption((option) => option.setName("member").setDescription("확인할 유저를 선택해 주세요.").setRequired(false));
export async function execute(interaction) {
	let target = interaction.options.getUser("member");
	let embed = new MessageEmbed();
	let member;

	if (target !== null) {
		member = interaction.guild.members.cache.get(target.id);
		embed
			.setTitle(`:notepad_spiral: ${target.tag}'s Profile`)
			.addField("**Name**", `\`${target.tag}\``, true)
			.addField("**ID**", `\`${target.id}\``, true)
			.addField("**Bot**", `\`${target.bot}\``, true)
			// .addField("**Roles**", '', true)
			.addField("**Joined at**", joinTimeStamp(member), true)
			.addField("**Created at**", createTimeStamp(target), true)
			.setThumbnail(target.avatarURL())
			.setFooter(interaction.user.tag, interaction.user.avatarURL())
			.setTimestamp()
			.setColor("BLUE");
		return await interaction.reply({ embeds: [embed] });
	}

	member = interaction.guild.members.cache.get(interaction.user.id);
	embed
		.setTitle(`:notepad_spiral: ${interaction.user.tag}'s Profile`)
		.addField("**Name**", `\`${interaction.user.tag}\``, true)
		.addField("**ID**", `\`${interaction.user.id}\``, true)
		.addField("**Bot**", `\`${interaction.user.bot}\``, true)
		// .addField("**Roles**", '', true)
		.addField("**Joined at**", joinTimeStamp(member), true)
		.addField("**Created at**", createTimeStamp(interaction.user), true)
		.setThumbnail(interaction.user.avatarURL())
		.setFooter(interaction.user.tag, interaction.user.avatarURL())
		.setTimestamp()
		.setColor("BLUE");

	await interaction.reply({ embeds: [embed] });
}
