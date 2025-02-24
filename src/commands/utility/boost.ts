import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';

export default {
  name: 'boost',
  run: async (client: Viish, message: Message, _args: string[]) => {
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
};
