const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require("discord.js")

function createTimeStamp(user) {
    return `${user.createdAt.getMonth()}/${user.createdAt.getDate()}/${user.createdAt.getFullYear()}`;
}

function joinTimeStamp(member) {
    return `${member.joinedAt.getMonth()}/${member.joinedAt.getDate()}/${member.joinedAt.getFullYear()}`
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("You can select members")
        .addUserOption(option =>
            option
                .setName("members")
                .setDescription("select member")
                .setRequired(false)
        ),
    async execute(interaction) {
        let target = interaction.options.getUser("members");
        let embed = new MessageEmbed();
        let member;

        if (target !== null) {
            member = interaction.guild.members.cache.get(target.id);
            embed.setTitle(`:notepad_spiral: ${target.tag}'s Profile`)
                .addField('**Name**', `\`${target.tag}\``, true)
                .addField('**ID**', `\`${target.id}\``, true)
                .addField('**Bot**', `\`${target.bot}\``, true)
                // .addField("**Roles**", '', true)
                .addField("**Joined at**", joinTimeStamp(member), true)
                .addField("**Created at**", createTimeStamp(target), true)
                .setThumbnail(target.avatarURL())
                .setFooter(interaction.user.tag, interaction.user.avatarURL())
                .setTimestamp()
                .setColor("BLUE");
            
            interaction.reply({ embeds : [embed] });
            return;
        }

        member = interaction.guild.members.cache.get(interaction.user.id)
        embed.setTitle(`:notepad_spiral: ${interaction.user.tag}'s Profile`)
            .addField('**Name**', `\`${interaction.user.tag}\``, true)
            .addField('**ID**', `\`${interaction.user.id}\``, true)
            .addField('**Bot**', `\`${interaction.user.bot}\``, true)
            // .addField("**Roles**", '', true)
            .addField("**Joined at**", joinTimeStamp(member), true)
            .addField("**Created at**", createTimeStamp(interaction.user), true)
            .setThumbnail(interaction.user.avatarURL())
            .setFooter(interaction.user.tag, interaction.user.avatarURL())
            .setTimestamp()
            .setColor("BLUE");

        interaction.reply({ embeds : [embed] });
    }
}