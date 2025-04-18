export default {
    name: 'unlock',
    run: async (_client, message, args) => {
        if (!message.guild?.members.me?.permissions.has('MANAGE_CHANNELS')) {
            return message.channel.send({ content: `You do not have \`ManageChannels\` Permission` });
        }
        const channel = message.guild?.channels.cache.get(args[0]) || message.channel;
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return message.channel.send({ content: `Please provide a valid text channel or use this command in a text channel.` });
        }
        try {
            await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            });
            return message.channel.send({ content: `The channel ${channel.name} has been successfully unlocked.` });
        }
        catch (error) {
            console.error(error);
            return message.channel.send({ content: `An error occurred while unlocking the channel.` });
        }
    }
};
