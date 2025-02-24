export default {
    name: 'messageCreate',
    run: async (client, message) => {
        if (message.author.bot || message.author.id !== client.user?.id)
            return;
        const data = (await client.database.prepare('SELECT * FROM autoreact WHERE client_id = ?').get('key'));
        if (!data)
            return;
        const keywords = JSON.parse(data.keyword || '[]');
        const emojis = JSON.parse(data.emoji || '[]');
        for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i];
            const emoji = emojis[i];
            if (message.content.includes(keyword)) {
                await message.react(emoji).catch(() => null);
            }
        }
    }
};
