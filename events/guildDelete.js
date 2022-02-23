const database = require('../utils/database');

module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        database.dropTable(guild);
    }
}