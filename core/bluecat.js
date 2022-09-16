import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Client, Collection, Intents } from "discord.js";
import { clientId, token } from "./config.json";

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_BANS
	],
	partials: ["CHANNEL"]
});
client.commands = new Collection();

class BlueCat {
	client;
	commands = [];

	constructor(client) {
		this.client = client;
	}

	async loadEvents() {
		const eventFiles = readdirSync("./events").filter((file) => file.endsWith(".js"));
		for (const file of eventFiles) {
			const event = await import(`./events/${file}`);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
			console.log(`Loaded ${file}`);
		}
	}

	async loadCommands() {
		const commands = [];
		const commandFiles = readdirSync("./commands").filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const command = await import(`./commands/${file}`);
			console.log(`Loaded ${command.data.name}`);
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
		}

		const rest = new REST({ version: "10" }).setToken(token);
		(async () => {
			try {
				console.log("Started refreshing application (/) commands.");
				await rest.put(Routes.applicationCommands(clientId), {
					body: commands
				});

				console.log("Successfully reloaded application (/) commands.");
			} catch (error) {
				console.error(error);
			}
		})();
	}

	login() {
		client.login(token);
	}
}

export const cat = new BlueCat(client);
