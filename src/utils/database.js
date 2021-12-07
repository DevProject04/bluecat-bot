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
            db.run(`create table if not exists ${guild.id}(\`id\` varchar(18) not null, \`warn_count\` int not null, primary key(\`id\`));`);
        } catch (err) {
            console.log(err);
            return;
        }
    },
    close() {
        db.close()
    }
}