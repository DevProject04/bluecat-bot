const data = require('../utils/data');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        data.addUser(member.guild, member.user);
    }
}