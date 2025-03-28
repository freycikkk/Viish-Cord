/** @format */

import axios from 'axios';
import type { Command } from '../../interfaces/Commands';

export default {
  name: 'growth',
  aliases: [],
  async run(_client, message, args) {
    const days = args[0] || 1;
    const apiUrl = `https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=usd&days=${days}`;

    const response = (await axios.get(apiUrl)) as { data: { prices: { [key: string]: number }[] } };
    const prices = response.data.prices;

    const firstPrice = prices[0]![1];
    const lastPrice = prices[prices.length - 1]![1];

    const priceChange = ((lastPrice! - firstPrice!) / firstPrice!) * 100;
    const growth = priceChange >= 0 ? `+${priceChange.toFixed(2)}%` : `${priceChange.toFixed(2)}%`;

    const trend = priceChange >= 0 ? 'up' : 'down';

    await message.reply({
      content: `Litecoin (LTC) has gone ${trend} by ${growth} over the last ${days} day(s).`
    });
  }
} satisfies Command;
