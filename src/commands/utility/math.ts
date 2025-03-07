import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'math',
  aliases: ['m'],
  run: async (_client: Viish, message: Message, args: string[]) => {
    const input = args.join('');
    try {
      const result = eval(input);
      await message.reply({ content: `${result}` });
    } catch {}
  }
};
