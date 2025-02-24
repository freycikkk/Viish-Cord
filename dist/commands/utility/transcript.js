import { Message, TextChannel } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
import transcript from 'discord-selfbot-transcripts';
export default {
    name: 'transcript',
    run: async (_client, message, _args) => {
        await message.reply({
            files: [
                await transcript.createTranscript(message.channel, {
                    fileName: `${message.channel.name}.html`
                })
            ]
        });
    }
};
