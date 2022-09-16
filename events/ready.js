import data from "../utils/database.js";
import { version } from "../package.json";

export const name = "ready";
export async function execute(client) {
	data;
	console.log(`Logged in as ${client.user.tag}`);

	client.user.setActivity(`${client.user.username} ${version}`, "Game");
}
