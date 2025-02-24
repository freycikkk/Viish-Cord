import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'addbot',
    BotPerms: ['MANAGE_GUILD'],
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply('Please provide a valid bot invite link.');
        }
        const invitelink = args[0];
        await client.authorizeURL(invitelink, {
            guild_id: message.guild?.id,
            authorize: true
        });
        await message.react('✅');
    }
};
