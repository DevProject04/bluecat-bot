const data = require('../utils/database');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        data.addUser(member.guild, member.user);
    }
}