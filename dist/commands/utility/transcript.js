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
