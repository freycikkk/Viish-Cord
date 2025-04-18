/** @format */

import { joinVoiceChannel } from '@discordjs/voice';
import type { VoiceChannel } from 'discord.js-selfbot-v13';
import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'join',
  aliases: [],
  async run(client, message, args) {
    const channel = client.channels.cache.get(args[0] as string) || message.member?.voice.channel;

    if (!channel) {
      return message.reply('Please provide a valid voice channel or join one!');
    }

    if (!message.guild?.id) {
      return message.reply("Could not determine the guild ID. Are you sure you're in a server?");
    }

    joinVoiceChannel({
      channelId: (channel as VoiceChannel).id,
      guildId: message.guild.id,
      adapterCreator: (channel as VoiceChannel).guild.voiceAdapterCreator
    });

    message.reply('I have joined your provided voice channel!');
    return;
  }
} satisfies Command;
