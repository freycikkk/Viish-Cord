/** @format */

import axios from 'axios';
import type { Command } from '../../interfaces/Commands';

export default {
  name: 'u2i',
  aliases: [],
  async run(_client, message, args) {
    const amountInUsd = parseFloat(args[0] as string);
    if (isNaN(amountInUsd) || amountInUsd <= 0) {
      return message.reply('Please provide a valid amount in USD.');
    }

    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

    try {
      const response = (await axios.get(apiUrl)) as { data: { rates: { INR: number } } };
      const usdToInrRate = response.data.rates.INR;
      const equivalentInr = amountInUsd * usdToInrRate;

      await message.reply({
        content: `₹${equivalentInr.toFixed(2)} INR`
      });
    } catch (error) {
      console.error(error);
      message.reply('Failed to retrieve exchange rates. Please try again later.');
    }
    return;
  }
} satisfies Command;
