import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'join',
    run: async (client, message, args) => {
        if (!args[0])
            return message.reply('Please provide a valid invite link.');
        const inviteCode = args[0];
        client.acceptInvite(inviteCode, {
            bypassOnboarding: true,
            bypassVerify: true
        });
    }
};
