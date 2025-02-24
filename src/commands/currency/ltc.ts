import axios from 'axios';
import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';

export default {
  name: 'ltc',
  run: async (_client: Viish, message: Message, _args: string[]) => {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';

    const response = await axios.get(apiUrl);
    const ltcPrice = response.data.litecoin.usd;

    await message.reply({
      content: `$${ltcPrice.toFixed(2)}`
    });
  }
};
