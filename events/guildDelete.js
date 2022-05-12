const data = require('../utils/database');

module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        data.dropTable(guild);
    }
}