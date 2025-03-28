/** @format */

import { handleAddTask, handleRemoveTask, handleResetTasks, handleViewTasks } from '../../functions/todo.js';
import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'todo',
  aliases: [],
  async run(client, message, args) {
    const task = args.slice(1).join(' ');
    switch (args[0]) {
      case 'add':
      case '+':
        await handleAddTask(client, message, task);
        break;
      case 'remove':
      case '-':
        await handleRemoveTask(client, message, parseInt(args[1] as string, 10));
        break;
      case 'config':
      case 'show':
      case 'list':
      case 'view':
        await handleViewTasks(client, message);
        break;
      case 'reset':
        await handleResetTasks(client, message);
        break;
      default:
        break;
    }
  }
} satisfies Command;
