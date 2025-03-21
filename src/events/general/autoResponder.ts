/** @format */

import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';
import type { Event } from '../../interfaces/Events.js';

export default {
  name: 'messageCreate',
  run: async (client: Viish, message: Message) => {
    if (message.author.bot || message.author.id !== client.user?.id) return;

    const args = message.content.trim().split(/\s+/);
    if (!args.length) return;

    const responseName = args.shift()?.toLowerCase();
    if (!responseName) return;

    const responseData = (await client.database.prepare('SELECT * FROM autoresponder WHERE client_id = ?').get('key')) as {
      names: string;
      response: string;
    };

    const names = JSON.parse(responseData.names || '[]') as string[];
    const responses = JSON.parse(responseData.response || '[]') as string[];
    const responseIndex = names.indexOf(responseName);

    if (responseIndex === -1) return;

    const response = responses[responseIndex] as string;
    await message.reply({ content: `${response}` });
  }
} satisfies Event<'messageCreate'>;
