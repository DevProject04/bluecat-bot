const fs = require('fs');
const sql = require('sqlite3').verbose();

let db;

module.exports = {
    createDb() {
        try {
            db = new sql.Database("src/config/data.sql");
            console.log('Connected database!');
        } catch (err) {
            console.log(err);
            return;
        }
    },
    readyTable(guild) {
        try {
            console.log(`create table: ${guild.id}`);
            db.run(`create table if not exists ${guild.id}(\`id\` varchar(18) not null, \`warn_count\` int not null, primary key(\`id\`));`);
        } catch (err) {
            console.log(err);
            return;
        }
    },
    setWarn(guild, user, value) {
        try {
            console.log(`set ${user.username}'s warn count: ${value}`)
            db.run(`update table ${guild.id} set warn_count = ? where id = ?`, value, user.id);
        } catch (err) {
            console.log(err);
            return;
        }
    },
    addWarn() {
        try {
            let result = db.query()
        } catch (err) {
            console.log(err);
            return;
        }
    },
    removeWarn() {

    },
    close() {
        db.close()
    }
}