const { createTable } = require('../utils/data');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        await createTable(guild);
    }
}