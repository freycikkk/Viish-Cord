/** @format */

import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'setbadge',
  aliases: [],
  async run(client, message, args) {
    if (!args[0]) {
      return message.reply('Please provide a valid badge field.');
    }

    const badgenumber: number = parseInt(args[0], 10);

    if (isNaN(badgenumber) || badgenumber < 0 || badgenumber > 3) {
      return message.reply('Please provide a number between 0 and 3.');
    }

    const hypeSquadTypes = ['HOUSE_BRAVERY', 'HOUSE_BRILLIANCE', 'HOUSE_BALANCE', 'LEAVE'] as const;

    const hypeSquadType = hypeSquadTypes[badgenumber] ?? 0;

    await client.user?.setHypeSquad(hypeSquadType);
    await message.react('✅');
    return;
  }
} satisfies Command;
