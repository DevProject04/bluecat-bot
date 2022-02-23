const database = require('../utils/database');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        database.createTable(guild);
    }
}