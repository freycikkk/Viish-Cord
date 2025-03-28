export default {
    name: 'serveravatar',
    aliases: ['servericon'],
    run: async (_client, message, _args) => {
        if (!message.guild) {
            return message.reply('This command must be run in a server.');
        }
        const server = message.guild;
        const avatarUrl = server.iconURL({ dynamic: true });
        return message.reply({
            content: `${avatarUrl}`
        });
    }
};
