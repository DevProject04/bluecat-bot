const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("유저를 추방시킬 수 있습니다.")
        .addUserOption(option =>
            option
                .setName("member")
                .setDescription("추방할 유저를 선택해 주세요!")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("추방 사유를 입력해 주세요!")
                .setRequired(false)
        ),
    async execute(interaction) {
        let target = interaction.options.getUser("member");
        let reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(target.id);
        let errEmbed = new MessageEmbed();
        
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
                .setDescription("관리자를 추방처리 하실 수 없습니다.")
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                .setColor("BLUE");
            interaction.reply({ embeds : [errEmbed], ephemeral: true });
            return;
        }

        if (reason === '') {
            reason = "undefined";
        }

        let embed = new MessageEmbed()
            .setTitle(":white_check_mark: Done!")
            .setDescription(`<@!${target.id}> has kicked! reason: ${reason}`)
            .addField("**처리자**", `<@!${interaction.user.id}>`, true)
            .addField("**처리대상**", `<@!${target.id}>`, true)
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setColor('BLUE');

        interaction.reply({ embeds : [embed] });

        await target.send(`You're kicked ${interaction.guild.name}!\n\`\`\`diff\n[Reason]\n+: ${reason}\`\`\``);
        await member.kick(reason);
    }
}