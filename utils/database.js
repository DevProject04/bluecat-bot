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
        
        connection.query(`insert into server_list values('${guild.id}', 3);`, function (err) {
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
    addUser(guild, user) {
        connection.query(`insert into d_${guild.id} values(${user.id}, 0);`, function (err) {
            if (err) console.error(err);
        });
    },
    removeUser(guild, user) {
        connection.query(`delete from d_${guild.id} where id = ${user.id};`, function (err) {
            if (err) console.error(err);
        });
    },
    getWarnCountLimit(guild) {
        connection.query(`select limit_warn_count from server_list where id = ${guild.id};`, function (err, results) {
            if (err) console.log(err);
            return results[0].warn_count;
        });
    },
    setWarnCountLimit(guild, value) {
        connection.query(`update table server_list limit_warn_count = ${value} where id = '${guild.id}';`, function (err) {
            if (err) console.log(err);
        });
    },
    getWarn(guild, user) {
        const sql = `select warn_count from d_${guild.id} where id = ${user.id};`;
        const result = connection.query(sql);

        console.log(result);
    },
    setWarn(guild, user, value) {
        connection.query(`update table d_${guild.id} warn_count = ${value} where id = ${user.id};`, function (err) {
            if (err) console.error(err);
            console.log(`set ${user.username}'s warn count: ${value}`)
        });
    },
    addWarn(guild, user) {
        let warn = this.getWarn(guild, user);
        this.setWarn(guild, user, warn++);
    },
    removeWarn(guild, user) {
        let warn = this.getWarn(guild, user);
        this.getWarn(guild, user, warn--);
    },
    disconnect() {
        connection.end();
    }
}