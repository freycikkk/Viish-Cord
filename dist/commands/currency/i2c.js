import axios from 'axios';
export default {
    name: 'i2c',
    run: async (_client, message, args) => {
        const amountInInr = parseFloat(args[0]);
        if (isNaN(amountInInr) || amountInInr <= 0) {
            return message.reply('Please provide a valid amount in INR.');
        }
        const inrToUsdApiUrl = 'https://api.exchangerate-api.com/v4/latest/INR';
        const ltcApiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd';
        const [inrToUsdResponse, ltcResponse] = (await Promise.all([axios.get(inrToUsdApiUrl), axios.get(ltcApiUrl)]));
        const inrToUsdRate = inrToUsdResponse.data.rates.USD;
        const ltcPriceInUsd = ltcResponse.data.litecoin.usd;
        const equivalentLtc = (amountInInr * inrToUsdRate) / ltcPriceInUsd;
        await message.reply({
            content: `${equivalentLtc.toFixed(6)} LTC`
        });
        return;
    }
};
