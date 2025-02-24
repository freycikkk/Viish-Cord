import { joinVoiceChannel } from '@discordjs/voice';
export default {
    name: 'join',
    run: async (client, message, args) => {
        const channel = client.channels.cache.get(args[0]) || message.member?.voice.channel;
        if (!channel) {
            return message.reply('Please provide a valid voice channel or join one!');
        }
        if (!message.guild?.id) {
            return message.reply("Could not determine the guild ID. Are you sure you're in a server?");
        }
        joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });
        message.reply('I have joined your provided voice channel!');
    }
};
