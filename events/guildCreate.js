const data = require('../utils/data');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        data.createTable(guild);
    }
}