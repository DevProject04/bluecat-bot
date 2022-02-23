const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("You can ban members")
        .addUserOption(option =>
            option
                .setName("members")
                .setDescription("Select banned member")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Write ban reason")
                .setRequired(false)
        ),
    async execute(interaction) {
        let target = interaction.options.getUser("members");
        let reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(target.id)
        let errEmbed = new MessageEmbed()

        if (!interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])) {
            errEmbed.setTitle("<a:no_marking:923823041564278805> **Error!**")
                .setDescription("관리자 전용 명령어입니다.")
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                .setColor("BLUE");
            
            interaction.reply({ embeds : [errEmbed], ephemeral: true });
            return;
        }

        if (member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])) {
            errEmbed.setTitle("<a:no_marking:923823041564278805> **Error!**")
                .setDescription("관리자를 차단처리 하실 수 없습니다.")
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                .setColor("BLUE");
            interaction.reply({ embeds : [errEmbed], ephemeral: true });
            return;
        }

        if (reason === '') {
            reason = "undefined";
        }

        let embed = new MessageEmbed()
            .setTitle("<a:checking:923822230255845396> **Done!**")
            .setDescription(`<@!${target.id}>님이 영구차단 처리 되셨습니다. reason: \`${reason}\``)
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setColor("BLUE");

        interaction.reply({ embeds : [embed] })

        await target.send(`You're banned from ${interaction.guild.name}!\n\`\`\`diff\n[Reason]\n+: ${reason}\`\`\``);
        member.ban();
    }
}