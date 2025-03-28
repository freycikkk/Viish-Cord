/** @format */

import { getVoiceConnection } from '@discordjs/voice';
import type { Command } from '../../interfaces/Commands';

export default {
  name: 'leave',
  aliases: [],
  async run(client, message, _args) {
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
} satisfies Command;
