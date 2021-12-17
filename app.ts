const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Intents } = require('discord.js');
const { clientId, token } = require('./src/config/config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_BANS] });
client.commands = new Collection();

class Bot {
	commands = []
	init() {
		this.loadEvnet();
		this.loadCommand();
		this.registerCommand();
	}

	loadEvnet() {
		const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.ts'));

		for (const file of eventFiles) {
			const event = require(`./src/events/${file}`);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}

			console.log(`[EVENT] Loaded ${file}`);
		}
	}

	loadCommand() {
		const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js') || file.endsWith('.ts'));

		for (const file of commandFiles) {
			const command = require(`./src/commands/${file}`);
			console.log(`[COMMAND] Loaded ${command.data.name}`);
			client.commands.set(command.data.name, command);
			this.commands.push(command.data.toJSON());
		}
	}

	registerCommand() {
		const rest = new REST({ version: '9' }).setToken(token);

		(async () => {
			try {
				console.log('[REGISTER] Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationCommands(clientId),
					{ body: this.commands },
				);

				console.log('[REGISTER] Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	}
}

const bot = new Bot();
bot.init();

client.login(token);