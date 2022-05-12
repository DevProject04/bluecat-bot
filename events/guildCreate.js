const data = require('../utils/database');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        data.createTable(guild);
    }
}