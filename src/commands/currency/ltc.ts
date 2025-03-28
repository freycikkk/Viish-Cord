/** @format */

import axios from 'axios';
import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'ltc',
  aliases: [],
  async run(_client, message, _args) {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';

    const response = (await axios.get(apiUrl)) as { data: { litecoin: { usd: number } } };
    const ltcPrice = response.data.litecoin.usd;

    await message.reply({
      content: `$${ltcPrice.toFixed(2)}`
    });
  }
} satisfies Command;
