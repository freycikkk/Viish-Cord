import axios from 'axios';
import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'checktoken',
  run: async (_client: Viish, message: Message, args: string[]) => {
    const token = args[0];
    if (!token) {
      return message.reply('**Please provide a token to check.**');
    }

    try {
      const response = await axios.get('https://discord.com/api/v10/users/@me', {
        headers: {
          Authorization: `${token}`
        }
      });

      if (response.data) {
        return message.reply(`**Token is valid!**\nUser: ${response.data.username}\nUser ID: ${response.data.id}`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return message.reply('**Invalid token.**');
      }
      return message.reply('**An error occurred while checking the token.**');
    }
  }
};
