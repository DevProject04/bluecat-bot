const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("유저를 영구차단 하실 수 있습니다.")
        .addUserOption(option =>
            option
                .setName("member")
                .setDescription("영구차단할 유저를 선택해 주세요.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("영구차단 사유를 입력해 주세요.")
                .setRequired(false)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser("member");
        let reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(target.id)
        const errEmbed = new MessageEmbed()

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

        const embed = new MessageEmbed()
            .setTitle("<a:checking:923822230255845396> **Done!**")
            .setDescription(`<@!${target.id}>님이 영구차단 처리 되셨습니다. reason: \`${reason}\``)
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setColor("BLUE");

        interaction.reply({ embeds : [embed] })

        await target.send(`당신은 ${interaction.guild.name} 서버에서 영구차단 조치가 되었습니다.!\n\`\`\`diff\nReason\n+: ${reason}\`\`\``);
        member.ban();
    }
}