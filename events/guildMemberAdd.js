const { addUser } = require('../utils/database');
const database = require('../utils/database');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        addUser(member.guild, member.user);
    }
}