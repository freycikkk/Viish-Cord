import axios from 'axios';
import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'u2i',
    run: async (_client, message, args) => {
        const amountInUsd = parseFloat(args[0]);
        if (isNaN(amountInUsd) || amountInUsd <= 0) {
            return message.reply('Please provide a valid amount in USD.');
        }
        const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
        try {
            const response = await axios.get(apiUrl);
            const usdToInrRate = response.data.rates.INR;
            const equivalentInr = amountInUsd * usdToInrRate;
            await message.reply({
                content: `₹${equivalentInr.toFixed(2)} INR`
            });
        }
        catch (error) {
            console.error(error);
            message.reply('Failed to retrieve exchange rates. Please try again later.');
        }
    }
};
