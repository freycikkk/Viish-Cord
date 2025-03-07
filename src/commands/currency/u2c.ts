import axios from 'axios';
import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'u2c',
  run: async (_client: Viish, message: Message, args: string[]) => {
    const amountInUsd = parseFloat(args[0] as string);
    if (isNaN(amountInUsd) || amountInUsd <= 0) {
      return message.reply('Please provide a valid amount in USD.');
    }

    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';

    try {
      const response = await axios.get(apiUrl);
      const ltcPriceInUsd = response.data.litecoin.usd;
      const equivalentLtc = amountInUsd / ltcPriceInUsd;

      await message.reply({
        content: `${equivalentLtc.toFixed(6)}`
      });
    } catch {}
  }
};
