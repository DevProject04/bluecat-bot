const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { db } = require('../utils/database');
const { botOwner } = require('../config.json');

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
        .setDescription("봇 주인용 커맨드 입니다.")
        .addStringOption(option => option.setName("code").setDescription("js 코드를 입력해 주세요!").setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== botOwner) {
            const errorEmbed = new MessageEmbed()
                .setTitle("<a:no_marking:923823041564278805> **Error!**")
                .setDescription("You're not bot owner!")
                .setColor('BLUE')
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

		    return await interaction.reply({ embeds: [errorEmbed] });
        }

        let code = interaction.options.getString("code");
        console.log(`${interaction.user.tag}'s Command: ${code}`);

        if (`${code}`.includes('interaction.reply')) {
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
                .setTitle("<a:checking:923822230255845396> **Complete!**")
                .setDescription("The code succesfully run!")
                .addField("**CODE**", `\`\`\`js\n${code}\n\`\`\``)
                .setColor('BLUE')
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });
                
            if (cleaned.length > 1023) {
                const date = new Date().getTime();
				fs.writeFileSync(`./temp/${date}.txt`, cleaned, "utf8");

                embed.addField("**RESULT**", `\`\`\`js\n${date}.txt 파일을 참조해 주세요.\`\`\``)

                return await interaction.reply({ embeds: [embed], files: [`./temp/${date}.txt`] }).then(function () {
					fs.unlinkSync(`./temp/${date}.txt`); // 파일 삭제
				});
            }

            embed.addField("**RESULT**", `\`\`\`js\n${cleaned}\n\`\`\``)
		    await interaction.reply({ embeds: [embed] });
        } catch (err) {
            const embed = new MessageEmbed()
                .setTitle("<a:no_marking:923823041564278805> **Error!**")
                .setDescription("Maybe your code have some error...")
                .addField("**CODE**", `\`\`\`js\n${code}\n\`\`\``)
                .addField("**ERROR**", `\`\`\`\n${err}\n\`\`\``)
                .setColor("BLUE")
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

		     await interaction.reply({ embeds: [embed] });
        }
    }
}