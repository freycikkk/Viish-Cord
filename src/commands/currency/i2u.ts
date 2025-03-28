/** @format */

import axios from 'axios';
import type { Command } from '../../interfaces/Commands';

export default {
  name: 'i2u',
  aliases: [],
  async run(_client, message, args) {
    const amountInInr = parseFloat(args[0] as string);
    if (isNaN(amountInInr) || amountInInr <= 0) {
      return message.reply('Please provide a valid amount in INR.');
    }

    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/INR';

    const response = (await axios.get(apiUrl)) as { data: { rates: { USD: number } } };
    const inrToUsdRate = response.data.rates.USD;
    const equivalentUsd = amountInInr * inrToUsdRate;

    await message.reply({
      content: `$${equivalentUsd.toFixed(2)} USD`
    });
    return;
  }
} satisfies Command;
