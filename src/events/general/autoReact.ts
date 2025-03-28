/** @format */

import type { Message } from 'discord.js-selfbot-v13';
import type { Event } from '../../interfaces/Events.js';

export default {
  name: 'messageCreate',
  async run(client, message: Message<true>) {
    if (message.author.bot || message.author.id !== client.user?.id) return;
    const data = (await client.database.prepare('SELECT * FROM autoreact WHERE client_id = ?').get('key')) as { keyword: string; emoji: string };
    if (!data) return;

    const keywords = JSON.parse(data.keyword || '[]') as string[];
    const emojis = JSON.parse(data.emoji || '[]') as string[];

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i] as string;
      const emoji = emojis[i] as string;

      if (message.content.includes(keyword)) {
        await message.react(emoji).catch(() => null);
      }
    }
  }
} satisfies Event<'messageCreate'>;
