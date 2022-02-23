const data = require('../utils/database.js');
const { version } = require("../package.json");

module.exports = {
    name: "ready",
    async execute(client) {
		data.connect();
		console.log(`Logged in as ${client.user.tag}`);
		
		client.user.setActivity(`${client.user.username} ${version}`, "Game");
	},
}