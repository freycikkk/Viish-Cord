/** @format */

import { handleAddResponse, handleConfig, handleRemoveResponse, handleReset } from '../../functions/autoResponder.js';
import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'autoresponder',
  aliases: ['ar'],
  async run(client, message, args) {
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
} satisfies Command;
