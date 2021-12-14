const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("You can kick members")
        .addUserOption(option =>
            option
                .setName("members")
                .setDescription("Select kicked member!")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Write kick reason!")
                .setRequired(false)
        ),
    async execute(interaction) {
        let target = interaction.options.getUser("members");
        let reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(target.id);
        let errEmbed = new MessageEmbed();
        
        if (!interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])) {
            errEmbed.setTitle(":no_entry: Error!")
                .setDescription(`You're not management!`)
                .setFooter(interaction.user.tag, interaction.user.avatarURL())
                .setColor('BLUE');
            
            interaction.reply({ embeds : [errEmbed], ephemeral: true });
            return;
        }

        if (member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])) {
            errEmbed.setTitle(":no_entry: Error!")
                .setDescription(`You cannot kicking management!`)
                .setFooter(interaction.user.tag, interaction.user.avatarURL())
                .setColor('BLUE');

            interaction.reply({ embeds : [errEmbed], ephemeral: true });
            return;
        }

        if (reason === 'null') {
            reason = "undefined";
        }

        let embed = new MessageEmbed()
            .setTitle(":white_check_mark: Done!")
            .setDescription(`<@!${target.id}> has kicked! reason: ${reason}`)
            .setFooter(interaction.user.tag, interaction.user.avatarURL())
            .setColor('BLUE');

        interaction.reply({ embeds : [embed] });

        await target.send(`You're kicked ${interaction.guild.name}!\n\`\`\`diff\n[Reason]\n+: ${reason}\`\`\``);
        await member.kick(reason);
    }
}