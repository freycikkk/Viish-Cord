import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
import { handleAddReact, handleRemoveReact, handleConfig, handleReset } from '../../functions/autoReact.js';
export default {
    name: 'autoreact',
    aliases: ['react'],
    run: async (client, message, args) => {
        const keyword = args[1];
        const emoji = args[2];
        switch (args[0]) {
            case 'add':
            case '+':
                await handleAddReact(client, message, keyword, emoji);
                break;
            case 'remove':
            case '-':
                await handleRemoveReact(client, message, keyword);
                break;
            case 'config':
            case 'show':
            case 'list':
            case 'view':
                await handleConfig(client, message);
                break;
            case 'reset':
                await handleReset(client, message);
                break;
            default:
                break;
        }
    }
};
