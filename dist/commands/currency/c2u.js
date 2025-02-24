import axios from 'axios';
import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'c2u',
    run: async (_client, message, args) => {
        const amountInLitecoin = parseFloat(args[0]);
        if (isNaN(amountInLitecoin) || amountInLitecoin <= 0) {
            return message.reply('Please provide a valid amount in Litecoin.');
        }
        const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';
        const response = await axios.get(apiUrl);
        const ltcToUsdRate = response.data.litecoin.usd;
        const equivalentUsd = amountInLitecoin * ltcToUsdRate;
        await message.reply({
            content: `$${equivalentUsd.toFixed(2)} USD`
        });
    }
};
