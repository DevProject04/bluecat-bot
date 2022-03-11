const { SlashCommandBuilder } = require("@discordjs/builders");
const database = require('../utils/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setting")
        .setDescription("관리기능 설정 커맨드 입니다.")
        .addIntegerOption(option => 
            option
                .setName("warn_count")
                .setDescription("최대 경고 카운트를 설정 합니다.")
                .setRequired(true)),
    async execute(interaction) {
        const warnCount = interaction.options.getInteger("warn_count", true);
        database.setWarnCountLimit(interaction.guild, warnCount);
        await interaction.reply({ content: `이 서버의 최대 경고 카운트는 이제 ${warnCount}회 입니다.` });
    }
}