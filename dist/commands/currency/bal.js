import axios from 'axios';
export default {
    name: 'bal',
    BotPerms: ['EMBED_LINKS'],
    run: async (client, message, args) => {
        const address = args[0] || client.address;
        const balanceApiUrl = `https://api.blockcypher.com/v1/ltc/main/addrs/${address}`;
        const rateApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd,eur,inr`;
        const [balanceResponse, rateResponse] = await Promise.all([axios.get(balanceApiUrl), axios.get(rateApiUrl)]);
        const balanceData = balanceResponse.data;
        const rates = rateResponse.data.litecoin;
        const confirmed = balanceData.balance / 1e8;
        const unconfirmed = balanceData.unconfirmed_balance / 1e8;
        const totalReceived = balanceData.total_received / 1e8;
        const recentTransactions = balanceData.txrefs?.slice(0, 5).map((tx) => `- [${tx.tx_hash}](https://live.blockcypher.com/ltc/tx/${tx.tx_hash})`) || [];
        const messageContent = `
**Confirmed Balance:** ${confirmed.toFixed(8)} LTC / $${(confirmed * rates.usd).toFixed(2)} USD / €${(confirmed * rates.eur).toFixed(2)} EUR / ₹${(confirmed * rates.inr).toFixed(2)} INR
**Unconfirmed Balance:** ${unconfirmed.toFixed(8)} LTC / $${(unconfirmed * rates.usd).toFixed(2)} USD / €${(unconfirmed * rates.eur).toFixed(2)} EUR / ₹${(unconfirmed * rates.inr).toFixed(2)} INR
**Total Received:** ${totalReceived.toFixed(8)} LTC / $${(totalReceived * rates.usd).toFixed(2)} USD / €${(totalReceived * rates.eur).toFixed(2)} EUR / ₹${(totalReceived * rates.inr).toFixed(2)} INR

**Last 5 Transactions:**
${recentTransactions.length > 0 ? recentTransactions.join('\n') : 'No recent transactions available.'}
      `;
        await message.reply({
            content: messageContent
        });
    }
};
