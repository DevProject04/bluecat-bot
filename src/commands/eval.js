const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { botOwner } = require('../config/config.json');

const clean = async (text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });
    
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
    text.trim()
    
    return text;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Bot owner function")
        .addStringOption(option => option.setName("code").setDescription("js 코드를 입력해 주세요!").setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id === botOwner) {
            let code = interaction.options.getString("code");
            console.log(`${interaction.user.tag}'s Command: ${code}`);

            if (`${code}`.includes('interaction')) {
                try {
                    await eval(code);
                    return;
                } catch (err) {
                    console.log(err);
                    return;
                }
            }

            try {
                let evaled = await eval(code);
                let cleaned = await clean(evaled);

                const embed = new MessageEmbed()
                    .setTitle(":white_check_mark: Complete!")
                    .setDescription("The code succesfully run!")
                    .addField("**CODE**", `\`\`\`js\n${code}\n\`\`\``)
                    .addField("**RESULT**", `\`\`\`js\n${cleaned}\n\`\`\``)
                    .setColor('BLUE')
                    .setFooter(interaction.user.tag, interaction.user.avatarURL());

		        await interaction.reply({ embeds: [embed] });
            } catch (err) {
                const embed = new MessageEmbed()
                    .setTitle(":warning: Error!")
                    .setDescription("Maybe your code have some error...")
                    .addField("**CODE**", `\`\`\`js\n${code}\n\`\`\``)
                    .addField("**ERROR**", `\`\`\`js\n${err}\n\`\`\``)
                    .setColor("BLUE")
                    .setFooter(interaction.user.tag, interaction.user.avatarURL());

		        await interaction.reply({ embeds: [embed] });
                return;
            }
        } else {
            const errorEmbed = new MessageEmbed()
                .setTitle(":octagonal_sign: Error!")
                .setDescription("You're not bot owner!")
                .setColor('BLUE')
                .setFooter(interaction.user.tag, interaction.user.avatarURL());

		    await interaction.reply({ embeds: [errorEmbed] });
        }
    }
}