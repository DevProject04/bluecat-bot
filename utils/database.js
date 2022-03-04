const { dbInfo } = require('../config.json');
const mysql = require('mysql');

let connection;
(async () => {
    connection = mysql.createConnection({
        host: dbInfo.host,
        user: dbInfo.username,
        password: dbInfo.password,
        database: dbInfo.dbName
    });
});

console.log('connected to: %s', dbInfo.host);

function close() {
    return new Promise((resolve, reject) => {
        this.connection.end(err => {
            if (err)
                return reject(err);
            resolve();
        });
    });
}

module.exports = {
    db: connection
}