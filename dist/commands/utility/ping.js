import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'ping',
    run: async (client, message, _args) => {
        await message.reply({
            content: `${client.ws.ping}ms`
        });
    }
};
