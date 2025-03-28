import axios from 'axios';
export default {
    name: 'checkpromo',
    aliases: ['checkcode', 'promocheck'],
    run: async (_client, message, args) => {
        const input = args[0];
        if (!input)
            return message.reply('**Please provide a promotion code or URL to check.**');
        const promoCodeMatch = input.match(/\/promotions\/([a-zA-Z0-9]+)/);
        const promoCode = promoCodeMatch ? promoCodeMatch[1] : input;
        try {
            const response = (await axios.get(`https://discord.com/api/v9/entitlements/gift-codes/${promoCode}?with_application=false&with_subscription_plan=true`));
            const promoData = response.data;
            if (promoData.uses > 0) {
                return message.reply('**This promo code has already been used.**');
            }
            const planName = promoData.subscription_plan.name;
            const promoType = planName.includes('1 Month') ? '1 Month Nitro' : planName.includes('3 Month') ? '3 Month Nitro' : 'Unknown Promotion';
            await message.reply(`**Promo Code is Valid**\nType: **${promoType}**`);
        }
        catch (error) {
            await message.reply('**Invalid or expired promotion code.**');
        }
        return;
    }
};
