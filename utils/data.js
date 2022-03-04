const { db } = require("./database")

module.exports = {
    async createTable(guild) {
        db.query(`create table if not exists d_${guild.id}(id varchar(18) not null, warn_count int not null, primary key(id));`);
        db.query(`insert into server_list values(${guild.id}, 3);`);

        guild.members.fetch().then(members => {
            members.forEach(member => {
                db.query(`insert into d_${guild.id} values(${member.id}, 0);`);
            });
        });
    },
    dropTable(guild) {
        db.query(`delete table d_${guild.id};`);
    },
    addUser(guild, user) {
        db.query(`insert into d_${guild.id} values(${user.id}, 0);`);
    },
    removeUser(guild, user) {
        db.query(`delete from d_${guild.id} where id = ${user.id};`);
    },
    async getWarn(guild, user) {
       let [rows, fields] = await db.query(`select warn_count from d_${guild.id} where id = ${user.id};`)
    },
    setWarn(guild, user, value) {
        db.query(`update table d_${guild.id} warn_count = ${value} where id = ${user.id};`);
    },
    addWarn(guild, user) {
        let warn = this.getWarn(guild, user);
        this.setWarn(guild, user, warn++);
    },
    addUser(guild, user) {
        db.query(`insert into d_${guild.id} values(${user.id}, 0);`);
    },
    removeUser(guild, user) {
        db.query(`delete from d_${guild.id} where id = ${user.id};`);
    },
}