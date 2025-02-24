import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';
export default {
    name: 'profit',
    run: async (client, message, args) => {
        const profitQuantity = parseInt(args[0], 10);
        const data = (await client.database.prepare('SELECT profits FROM profits WHERE profit_type = ?').get('profit'));
        if (!data) {
            await client.database.prepare('INSERT INTO profits (profit_type, profits) VALUES (?, ?)').run('profit', 0);
            return message.reply({
                content: 'No profit data found. Initialized to 0. Please try again.'
            });
        }
        const currentProfits = data.profits || 0;
        if (!isNaN(profitQuantity)) {
            const newProfits = currentProfits + profitQuantity;
            await client.database.prepare('UPDATE profits SET profits = ? WHERE profit_type = ?').run(newProfits, 'profit');
            return message.reply({
                content: `Profit updated! Added ${profitQuantity}. Total profit: ${newProfits}.`
            });
        }
        else if (args[0]?.toLowerCase() === 'reset') {
            await client.database.prepare('UPDATE profits SET profits = ? WHERE profit_type = ?').run(0, 'profit');
            return message.reply({
                content: 'Profit has been reset to 0.'
            });
        }
        else {
            return message.reply({
                content: `Your all time profit is: ₹${currentProfits}.`
            });
        }
    }
};
