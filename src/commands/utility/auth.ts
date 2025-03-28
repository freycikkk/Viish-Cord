/** @format */

import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'addbot',
  aliases: [],
  async run(client, message, args) {
    if (!args[0]) {
      return message.reply('Please provide a valid bot invite link.');
    }

    const invitelink = args[0];

    await client.authorizeURL(invitelink, {
      guild_id: message.guild.id,
      authorize: true
    });

    await message.react('✅');
    return;
  }
} satisfies Command;
