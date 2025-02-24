import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'banner',
    run: async (client, message, args) => {
        let target;
        if (args[0]) {
            target = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!target) {
                return message.reply('User not found. Please mention a valid user or provide a valid user ID.');
            }
        }
        else {
            target = message.author;
        }
        const bannerUrl = target.bannerURL({ dynamic: true });
        if (!bannerUrl) {
            return message.reply('This user does not have a banner.');
        }
        return message.reply({
            content: `${bannerUrl}`
        });
    }
};
