import { dropTable } from "../utils/data";

export const name = "guildDelete";
export async function execute(guild) {
	dropTable(guild);
}
