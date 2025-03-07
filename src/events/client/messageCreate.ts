/** @format */

import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';
import type { Event } from '../../interfaces/Events.js';

async function handleCommand(client: Viish, message: Message, args: string[]) {
  const cmd = args.shift()?.toLowerCase();
  if (cmd?.length == 0) return;

  let command =
    client.commands.get(cmd ?? '') ||
    [...client.commands.values()].find((c) => (Array.isArray(c.aliases) ? c.aliases.includes(cmd ?? '') : c.aliases === cmd));

  if (command) {
    if (message.author.id === client.user?.id) {
      command.run(client, message, args);
    }
  }
}

export default {
  name: 'messageCreate',
  run: async (client: Viish, message: Message) => {
    client.database.prepare(`CREATE TABLE IF NOT EXISTS afk (user_id TEXT PRIMARY KEY, reason TEXT, time TEXT)`).run();
    client.database.prepare(`CREATE TABLE IF NOT EXISTS todos (user_id TEXT PRIMARY KEY, tasks TEXT)`).run();
    client.database.prepare(`CREATE TABLE IF NOT EXISTS autoresponder (client_id TEXT PRIMARY KEY, names TEXT, response TEXT)`).run();
    client.database.prepare(`CREATE TABLE IF NOT EXISTS autoreact (client_id TEXT PRIMARY KEY, keyword TEXT, emoji TEXT)`).run();
    client.database.prepare(`CREATE TABLE IF NOT EXISTS profits (profit_type TEXT PRIMARY KEY, profits INTEGER DEFAULT 0)`).run();
    const prefix = client.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if (args.length === 0) return;

    await handleCommand(client, message, args);
  }
} satisfies Event<'messageCreate'>;
