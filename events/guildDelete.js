const { dropTable } = require('../utils/data');

module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        await dropTable(guild);
    }
}