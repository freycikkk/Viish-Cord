import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'messageCreate',
    run: async (client, message) => {
        if (message.author.bot || message.author.id !== client.user?.id)
            return;
        const args = message.content.trim().split(/\s+/);
        if (!args.length)
            return;
        const responseName = args.shift()?.toLowerCase();
        if (!responseName)
            return;
        const responseData = (await client.database.prepare('SELECT * FROM autoresponder WHERE client_id = ?').get('key'));
        const names = JSON.parse(responseData.names || '[]');
        const responses = JSON.parse(responseData.response || '[]');
        const responseIndex = names.indexOf(responseName);
        if (responseIndex === -1)
            return;
        const response = responses[responseIndex];
        await message.reply({ content: `${response}` });
    }
};
