/** @format */

import type { Command } from '../../interfaces/Commands.js';

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  name: 'delete',
  aliases: [],
  async run(client, message, args) {
    let limit = parseInt(args[0] as string, 10) || 10;
    if (isNaN(limit) || limit < 1 || limit > 100) return;
    try {
      const fetchedMessages = await message.channel.messages.fetch({
        limit: 10
      });
      const clientMessages = fetchedMessages.filter((msg) => msg.author.id === client.user?.id);

      for (const msg of clientMessages.values()) {
        await wait(2000);
        await msg.delete();
      }
    } catch {}
  }
} satisfies Command;
