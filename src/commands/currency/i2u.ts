import axios from 'axios';
import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'i2u',
  run: async (_client: Viish, message: Message, args: string[]) => {
    const amountInInr = parseFloat(args[0] as string);
    if (isNaN(amountInInr) || amountInInr <= 0) {
      return message.reply('Please provide a valid amount in INR.');
    }

    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/INR';

    const response = await axios.get(apiUrl);
    const inrToUsdRate = response.data.rates.USD;
    const equivalentUsd = amountInInr * inrToUsdRate;

    await message.reply({
      content: `$${equivalentUsd.toFixed(2)} USD`
    });
  }
};
