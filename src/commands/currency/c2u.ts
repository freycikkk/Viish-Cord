/** @format */

import axios from 'axios';
import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'c2u',
  run: async (_client: Viish, message: Message, args: string[]) => {
    const amountInLitecoin = parseFloat(args[0] as string);
    if (isNaN(amountInLitecoin) || amountInLitecoin <= 0) {
      return message.reply('Please provide a valid amount in Litecoin.');
    }

    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';

    const response = (await axios.get(apiUrl)) as { data: { litecoin: { usd: number } } };
    const ltcToUsdRate = response.data.litecoin.usd;
    const equivalentUsd = amountInLitecoin * ltcToUsdRate;

    await message.reply({
      content: `$${equivalentUsd.toFixed(2)} USD`
    });
    return;
  }
};
