const data = require('../utils/data');

module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        data.dropTable(guild);
    }
}