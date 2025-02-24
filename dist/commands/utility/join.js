export default {
    name: 'join',
    run: async (client, message, args) => {
        if (!args[0])
            return message.reply('Please provide a valid invite link.');
        const inviteCode = args[0];
        client.acceptInvite(inviteCode, {
            bypassOnboarding: true,
            bypassVerify: true
        });
    }
};
