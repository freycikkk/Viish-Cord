import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'serverbanner',
  run: async (_client: Viish, message: Message, _args: string[]) => {
    if (!message.guild) {
      return message.reply('This command must be run in a server.');
    }
    const server = message.guild;

    const bannerUrl = server.bannerURL();

    if (!bannerUrl) {
      return message.reply('This server does not have a banner.');
    }

    return message.reply({
      content: `${bannerUrl}`
    });
  }
};
