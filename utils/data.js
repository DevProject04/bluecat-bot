const { dbInfo } = require('../config.json');
const mysql = require('mysql2/promise');

const connection = async () => await mysql.createConnection({
    host: dbInfo.host,
    user: dbInfo.username,
    password: dbInfo.password,
    database: dbInfo.dbName
});

const createTable = async (guild) => {
    await connection.execute("create table if not exist ? (`id` varchar(18) not null, `warn_count` int not null, primary key(`id`));", [`d_${guild.id}`]);
    await connection.execute("insert into server_list values(?, 3);", [guild.id]);
}

const dropTable = async (guild) => {
    await connection.execute("drop table ?;", [`d_${guild.id}`]);
    await connection.execute("delete from server_list where id = ?", [guild.id]);
}

module.exports = {
    createTable,
    dropTable,
    // async addUser(guild, user) {
    //     await db.query(`insert into d_${guild.id} values(${user.id}, 0);`);
    // },
    // removeUser(guild, user) {
    //     db.query(`delete from d_${guild.id} where id = ${user.id};`);
    // },
    // async getWarn(guild, user) {
    //    let [rows, fields] = await db.query(`select warn_count from d_${guild.id} where id = ${user.id};`)
    //    console.log(rows);
    //    console.log(fields);

    //    return rows[0];
    // },
    // async setWarn(guild, user, value) {
    //     db.query(`update table d_${guild.id} warn_count = ${value} where id = ${user.id};`);
    // },
    // addWarn(guild, user) {
    //     let warn = this.getWarn(guild, user);
    //     this.setWarn(guild, user, warn++);
    // },
    // addUser(guild, user) {
    //     db.query(`insert into d_${guild.id} values(${user.id}, 0);`);
    // },
    // removeUser(guild, user) {
    //     db.query(`delete from d_${guild.id} where id = ${user.id};`);
    // },
}