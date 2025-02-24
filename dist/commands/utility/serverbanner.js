import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'serverbanner',
    run: async (_client, message, _args) => {
        if (!message.guild) {
            return message.reply('This command must be run in a server.');
        }
        const server = message.guild;
        const bannerUrl = server.bannerURL();
        if (!bannerUrl) {
            return message.reply('This server does not have a banner.');
        }
        return message.reply({
            content: `${bannerUrl}`
        });
    }
};
