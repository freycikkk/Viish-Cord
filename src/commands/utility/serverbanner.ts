/** @format */

import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'serverbanner',
  aliases: [],
  async run(_client, message, _args) {
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
} satisfies Command;
