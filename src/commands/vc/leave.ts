import { getVoiceConnection } from '@discordjs/voice';
import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';

export default {
  name: 'leave',
  run: async (client: Viish, message: Message, _args: string[]) => {
    let leftChannel = false;

    client.guilds.cache.forEach((guild) => {
      const connection = getVoiceConnection(guild.id);

      if (connection) {
        connection.destroy();
        leftChannel = true;
      }
    });

    if (leftChannel) {
      message.channel.send('I have left all voice channels!');
    } else {
      message.channel.send('I am not in any voice channel!');
    }
  }
};
