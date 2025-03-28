/** @format */

import { handleAddReact, handleConfig, handleRemoveReact, handleReset } from '../../functions/autoReact.js';
import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'autoreact',
  aliases: ['react'],
  async run(client, message, args) {
    const keyword = args[1];
    const emoji = args[2];
    switch (args[0]) {
      case 'add':
      case '+':
        await handleAddReact(client, message, keyword as string, emoji as string);
        break;
      case 'remove':
      case '-':
        await handleRemoveReact(client, message, keyword as string);
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
