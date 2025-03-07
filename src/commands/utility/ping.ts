/** @format */

import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'ping',
  run: async (client: Viish, message: Message, _args: string[]) => {
    await message.reply({
      content: `${client.ws.ping}ms`
    });
  }
};
