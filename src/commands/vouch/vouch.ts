import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';

export default {
  name: 'vouch',
  run: async (_client: Viish, message: Message, args: string[]) => {
    try {
      const payment_amount = args[0] as string;
      const payment_currency = args[1] as string;
      let money;

      const currencySymbols: Record<string, string> = {
        usd: '$',
        inr: '₹'
      };

      money = currencySymbols[payment_currency.toLowerCase()];

      const product = args.slice(2).join(' ');
      const User_Id = '1207080415123210311';
      const Server_Link = 'https://discord.gg/Q46rCmhZMq';
      const Channel_Link = 'https://discord.com/channels/1275486972252786730/1306239255764533248';

      if (!money) return message.reply("Invalid currency. Please specify 'usd' or 'inr'.");

      await message.delete();
      await message.channel.send(Server_Link);
      await message.channel.send(Channel_Link);
      await message.channel.send('**PLEASE VOUCH ME HERE**');
      await message.channel.send('**NO VOUCH NO WARRANTY OF PRODUCT**');
      await message.channel.send(`\`+vouch ${User_Id} LEGIT | ${product} [${money}${payment_amount}] • TYSM\``);
    } catch {}
  }
};
