const { version } = require("../package.json");
const { conn } = require("../utils/data");

module.exports = {
    name: "ready",
    async execute(client) {
		console.log(conn);
		console.log(`Logged in as ${client.user.tag}`);
		client.user.setActivity(`${client.user.username} ${version}`, "Game");
	},
}