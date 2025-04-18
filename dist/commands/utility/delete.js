function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
    name: 'delete',
    run: async (client, message, args) => {
        let limit = parseInt(args[0], 10) || 10;
        if (isNaN(limit) || limit < 1 || limit > 100)
            return;
        try {
            const fetchedMessages = await message.channel.messages.fetch({
                limit: 10
            });
            const clientMessages = fetchedMessages.filter((msg) => msg.author.id === client.user?.id);
            for (const msg of clientMessages.values()) {
                await wait(2000);
                await msg.delete();
            }
        }
        catch { }
    }
};
