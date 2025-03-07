import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';

export default {
  name: 'hide',
  run: async (_client: Viish, message: Message, args: string[]) => {
    if (!message.guild?.members.me?.permissions.has('MANAGE_CHANNELS')) {
      return message.channel.send({ content: `You do not have \`ManageChannels\` Permission` });
    }

    const channel = message.guild?.channels.cache.get(args[0] as string) || message.channel;

    if (!channel || channel.type !== 'GUILD_TEXT') {
      return message.channel.send({ content: `Please provide a valid text channel or use this command in a text channel.` });
    }

    try {
      await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        VIEW_CHANNEL: false
      });
      return message.channel.send({ content: `The channel ${channel.name} has been successfully hidden.` });
    } catch (error) {
      console.error(error);
      return message.channel.send({ content: `An error occurred while hiding the channel.` });
    }
  }
};
