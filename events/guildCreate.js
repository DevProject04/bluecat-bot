import { createTable } from "../utils/data";

export const name = "guildCreate";
export async function execute(guild) {
	createTable(guild);
}
