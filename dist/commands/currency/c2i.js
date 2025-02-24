import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
import axios from 'axios';
export default {
    name: 'c2i',
    run: async (_client, message, args) => {
        const amountInLitecoin = parseFloat(args[0]);
        if (isNaN(amountInLitecoin) || amountInLitecoin <= 0) {
            return message.reply('Please provide a valid amount in Litecoin.');
        }
        const ltcApiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';
        const usdToInrApiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
        const [ltcResponse, usdToInrResponse] = await Promise.all([axios.get(ltcApiUrl), axios.get(usdToInrApiUrl)]);
        const ltcToUsdRate = ltcResponse.data.litecoin.usd;
        const usdToInrRate = usdToInrResponse.data.rates.INR;
        const equivalentInr = amountInLitecoin * ltcToUsdRate * usdToInrRate;
        await message.reply({
            content: `₹${equivalentInr.toFixed(2)} INR`
        });
    }
};
