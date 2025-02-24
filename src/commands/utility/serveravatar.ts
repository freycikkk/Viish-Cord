import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';

export default {
  name: 'serveravatar',
  aliases: ['servericon'],
  run: async (_client: Viish, message: Message, _args: string[]) => {
    if (!message.guild) {
      return message.reply('This command must be run in a server.');
    }
    const server = message.guild;

    const avatarUrl = server.iconURL({ dynamic: true });

    return message.reply({
      content: `${avatarUrl}`
    });
  }
};
