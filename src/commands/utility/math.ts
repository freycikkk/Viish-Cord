/** @format */

import type { Command } from '../../interfaces/Commands';

export default {
  name: 'math',
  aliases: ['m'],
  async run(_client, message, args) {
    const input = args.join('');
    try {
      const result = eval(input) as string;
      await message.reply({ content: `${result}` });
    } catch {}
  }
} satisfies Command;
