import { Message } from 'discord.js-selfbot-v13';
import QRCode from 'qrcode';
import Viish from '../../base/Client.js';

export default {
  name: 'qr',
  run: async (_client: Viish, message: Message, args: string[]) => {
    const defaultUpiId = 'swastik1337@fam';
    const defaultLtcAddress = 'ltc1q3m887hunymwfavs00srm6qkdgfput42fufztnr';

    if (args[0] === 'ltc') {
      const amount = args[1] || '1';
      const ltcAddress = args[2] || defaultLtcAddress;
      const ltcLink = `litecoin:${ltcAddress}?amount=${amount}`;

      try {
        const qrCode = await QRCode.toBuffer(ltcLink);
        message.reply({
          files: [{ attachment: qrCode, name: 'ltc-qr.png' }]
        });
      } catch (error) {
        console.error(error);
        message.reply('**Failed to generate LTC QR code.**');
      }
    } else if (args[0] === 'inr' || args[0] === 'upi') {
      const amount = args[1] || '100';
      const upiId = args[2] || defaultUpiId;
      const upiLink = `upi://pay?pa=${upiId}&am=${amount}&tn=Payment`;

      try {
        const qrCode = await QRCode.toBuffer(upiLink);
        await message.reply({
          files: [{ attachment: qrCode, name: 'upi-qr.png' }]
        });
      } catch (error) {
        console.error(error);
        message.reply('**Failed to generate UPI QR code.**');
      }
    } else {
      message.reply('**Please provide a valid command. Example: `.qr ltc <amount> <address>` or `.qr upi <amount> <upi_id>`**');
    }
  }
};
