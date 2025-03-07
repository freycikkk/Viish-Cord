import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'join',
  run: async (client: Viish, message: Message, args: string[]) => {
    if (!args[0]) return message.reply('Please provide a valid invite link.');

    const inviteCode = args[0];

    client.acceptInvite(inviteCode, {
      bypassOnboarding: true,
      bypassVerify: true
    });
  }
};
