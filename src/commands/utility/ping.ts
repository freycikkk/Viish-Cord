/** @format */

import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'ping',
  aliases: [],
  async run(client, message, _args) {
    await message.reply({
      content: `${client.ws.ping}ms`
    });
  }
} satisfies Command;
