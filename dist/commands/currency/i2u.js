import axios from 'axios';
import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'i2u',
    run: async (_client, message, args) => {
        const amountInInr = parseFloat(args[0]);
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
