const mysql = require('mysql');
const { dbInfo } = require('../config.json');

const connection = new mysql.createConnection({
    host: dbInfo.host,
    user: dbInfo.username,
    password: dbInfo.password,
    database: dbInfo.dbName
})

module.exports = {
    conn: connection,
    connect() {
        connection.connect(function (err) {
            if (err) {
                console.error(`Error connecting: ${err.stack}`);
                return
            }

            console.log(`Connected as id ${connection.threadId}`);
        })
    },
    createTable(guild) {
        connection.query(`create table if not exists d_${guild.id}(id varchar(18) not null, warn_count int not null, primary key(id));`, function (err) {
            if (err) console.error(err);
            console.log(`create table: d_${guild.id}`);
        });

        guild.members.fetch().then(members => {
            members.forEach(member => {
                connection.query(`insert into d_${guild.id} values(${member.id}, 0);`, function (err) {
                    if (err) console.error(err);
                });
            });
        });

        
    },
    dropTable(guild) {
        connection.query(`drop table d_${guild.id};`, function (err) {
            if (err) console.error(err);
            console.log(`drop table: d_${guild.id}`);
        });
    },
    setWarn(guild, user, value) {
        connection.query(`update table d_${guild.id} warn_count = ${value} where id = ${user.id};`, function (err) {
            if (err) console.error(err);
            console.log(`set ${user.username}'s warn count: ${value}`)
        });
    },
    addWarn() {
        
    },
    removeWarn() {

    },
    close() {
        db.close()
    }
}