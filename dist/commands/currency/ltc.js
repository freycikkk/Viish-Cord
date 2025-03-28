import axios from 'axios';
export default {
    name: 'ltc',
    run: async (_client, message, _args) => {
        const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';
        const response = (await axios.get(apiUrl));
        const ltcPrice = response.data.litecoin.usd;
        await message.reply({
            content: `$${ltcPrice.toFixed(2)}`
        });
    }
};
