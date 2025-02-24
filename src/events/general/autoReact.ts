import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
import type { Event } from '../../interfaces/Events.js';

export default {
  name: 'messageCreate',
  run: async (client: Viish, message: Message) => {
    if (message.author.bot || message.author.id !== client.user?.id) return;
    const data = (await client.database.prepare('SELECT * FROM autoreact WHERE client_id = ?').get('key')) as { keyword: string; emoji: string };
    if (!data) return;

    const keywords = JSON.parse(data.keyword || '[]');
    const emojis = JSON.parse(data.emoji || '[]');

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      const emoji = emojis[i];

      if (message.content.includes(keyword)) {
        await message.react(emoji).catch(() => null);
      }
    }
  }
} satisfies Event<'messageCreate'>;
