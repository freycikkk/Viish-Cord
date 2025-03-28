/** @format */

import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'boost',
  aliases: [],
  async run(client, message, _args) {
    if (!message.guild) {
      return message.reply('This command must be run in a server.');
    }

    const allBoosts = await client.billing.fetchGuildBoosts();
    allBoosts.each(async (boost) => {
      await boost.unsubscribe().catch(() => null);
      if (message.guild) {
        await boost.subscribe(message.guild.id).catch(() => null);
      }
    });
    return message.reply(`Successfully boosted ${message.guild.name} 2 time!`);
  }
} satisfies Command;
