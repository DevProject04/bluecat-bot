const { createTable, conn } = require('../utils/data');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        await createTable(conn, guild);
    }
}