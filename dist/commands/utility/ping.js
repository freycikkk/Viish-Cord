export default {
    name: 'ping',
    run: async (client, message, _args) => {
        await message.reply({
            content: `${client.ws.ping}ms`
        });
    }
};
