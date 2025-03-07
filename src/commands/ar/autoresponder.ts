/** @format */

import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';
import { handleAddResponse, handleRemoveResponse, handleConfig, handleReset } from '../../functions/autoResponder.js';

export default {
  name: 'autoresponder',
  aliases: ['ar'],
  run: async (client: Viish, message: Message, args: string[]) => {
    const name = args[1];
    const response = args.slice(2).join(' ');
    switch (args[0]) {
      case 'add':
      case '+':
        await handleAddResponse(client, message, name as string, response);
        break;
      case 'remove':
      case '-':
        await handleRemoveResponse(client, message, name as string);
        break;
      case 'config':
      case 'show':
      case 'list':
      case 'view':
        await handleConfig(client, message);
        break;
      case 'reset':
        await handleReset(client, message);
        break;
      default:
        break;
    }
  }
};
