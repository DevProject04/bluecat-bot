import { addUser } from "../utils/data";

export const name = "guildMemberAdd";
export async function execute(member) {
	addUser(member.guild, member.user);
}
