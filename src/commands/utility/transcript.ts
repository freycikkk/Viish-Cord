/** @format */

import transcript from 'discord-selfbot-transcripts';
import type { TextChannel } from 'discord.js-selfbot-v13';
import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'transcript',
  aliases: [],
  async run(_client, message, _args) {
    await message.reply({
      files: [
        // @ts-expect-error
        await transcript.createTranscript(message.channel, {
          fileName: `${(message.channel as TextChannel).name}.html`
        })
      ]
    });
  }
} satisfies Command;
