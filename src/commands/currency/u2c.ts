/** @format */

import axios from 'axios';
import type { Command } from '../../interfaces/Commands';

export default {
  name: 'u2c',
  aliases: [],
  async run(_client, message, args) {
    const amountInUsd = parseFloat(args[0] as string);
    if (isNaN(amountInUsd) || amountInUsd <= 0) {
      return message.reply('Please provide a valid amount in USD.');
    }

    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';

    try {
      const response = (await axios.get(apiUrl)) as { data: { litecoin: { usd: number } } };
      const ltcPriceInUsd = response.data.litecoin.usd;
      const equivalentLtc = amountInUsd / ltcPriceInUsd;

      await message.reply({
        content: `${equivalentLtc.toFixed(6)}`
      });
    } catch {}
    return;
  }
} satisfies Command;
