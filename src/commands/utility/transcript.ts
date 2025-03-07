/** @format */

import type { Message, TextChannel } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';
import transcript from 'discord-selfbot-transcripts';

export default {
  name: 'transcript',
  run: async (_client: Viish, message: Message, _args: string[]) => {
    await message.reply({
      files: [
        await transcript.createTranscript(message.channel, {
          fileName: `${(message.channel as TextChannel).name}.html`
        })
      ]
    });
  }
};
