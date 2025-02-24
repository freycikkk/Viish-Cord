import axios from 'axios';
export default {
    name: 'u2c',
    run: async (_client, message, args) => {
        const amountInUsd = parseFloat(args[0]);
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
        }
        catch { }
    }
};
