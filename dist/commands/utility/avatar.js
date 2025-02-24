export default {
    name: 'avatar',
    run: async (client, message, args) => {
        let target;
        if (args[0]) {
            target = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!target) {
                return message.reply('User not found. Please mention a valid user or provide a valid user ID.');
            }
        }
        else {
            target = message.author;
        }
        const avatarUrl = target.displayAvatarURL({ dynamic: true });
        return message.reply({
            content: `${avatarUrl}`
        });
    }
};
