const fs = require("fs");
const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("You can reload my bot!"),
    async execute(interaction) {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        if (interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])) {
            for (const file of commandFiles) {
                const command = require(`./${file}`);

                console.log(`Unloaded ${command.data.name}!`);
                delete require.cache[require.resolve(`./${file}`)];
	            interaction.client.commands.delete(commandFiles);
                
                console.log(`Loaded ${command.data.name}!`);
                await interaction.client.commands.set(command.data.name, command);
            }

            const reloadEmbed = new MessageEmbed()
                .setTitle(":repeat: Reload Complete!")
                .setDescription(`All commands successful reloaded!`)
                .setColor('BLUE')
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

		    await interaction.reply({ embeds: [reloadEmbed] });
        } else {
            const errorEmbed = new MessageEmbed()
                .setTitle(":octagonal_sign: Error!")
                .setDescription(`You're not bot owner!`)
                .setColor("RED")
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

		    await interaction.reply({ embeds: [errorEmbed] });
        }
    }
}