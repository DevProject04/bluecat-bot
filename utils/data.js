const { dbInfo } = require('../config.json');
const { MongoClient } = require('mongodb');

const username = encodeURIComponent(dbInfo.username);
const password = encodeURIComponent(dbInfo.password);
const url = `${dbInfo.host}:${dbInfo.port}`;

const authMechanism = "SCRAM-SHA-256";

const uri = `mongodb://${username}:${password}@${url}/${dbInfo.dbName}?authMechanism=${authMechanism}`;
const client = new MongoClient(uri);

module.exports = {
    async run() {
        try {
            await client.connect();
            await client.db(dbInfo.dbName).command({ ping: 1 });

            console.log("Connected successfully to server");
        } catch (error) {
            console.error(error)
        }
    },
    conn: client
}