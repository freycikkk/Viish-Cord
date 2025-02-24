async function handleAddReact(client, message, keyword, emoji) {
    try {
        const data = (await client.database.prepare('SELECT * FROM autoreact WHERE client_id = ?').get('key'));
        if (!data) {
            client.database
                .prepare('INSERT INTO autoreact (client_id, keyword, emoji) VALUES (?, ?, ?)')
                .run('key', JSON.stringify([]), JSON.stringify([]));
            return message.reply({
                content: `Database was not set up. Please run the command again.`
            });
        }
        const keywords = JSON.parse(data.keyword || '[]');
        const emojis = JSON.parse(data.emoji || '[]');
        if (!keyword) {
            return message.reply({
                content: `Please provide a keyword for auto-reaction.`
            });
        }
        if (keywords.length >= 50) {
            return message.reply({
                content: `You can only have up to 50 keywords for auto-reactions.`
            });
        }
        if (!emoji) {
            return message.reply({
                content: `Please provide an emoji for auto-reaction.`
            });
        }
        if (keywords.includes(keyword)) {
            return message.reply({
                content: `The keyword \`${keyword}\` is already in auto-reactions.`
            });
        }
        keywords.push(keyword);
        emojis.push(emoji);
        await client.database
            .prepare('UPDATE autoreact SET keyword = ?, emoji = ? WHERE client_id = ?')
            .run(JSON.stringify(keywords), JSON.stringify(emojis), 'key');
        return message.reply({
            content: `Added \`${keyword}\` with the emoji \`${emoji}\` to auto-reactions.`
        });
    }
    catch {
        return message.reply(`An error occurred while adding auto-reaction.`);
    }
}
async function handleRemoveReact(client, message, keyword) {
    try {
        const data = (await client.database.prepare('SELECT * FROM autoreact WHERE client_id = ?').get('key'));
        const keywords = JSON.parse(data.keyword || '[]');
        const emojis = JSON.parse(data.emoji || '[]');
        const index = keywords.indexOf(keyword);
        if (index === -1) {
            return message.reply({
                content: `The keyword \`${keyword}\` was not found in auto-reactions.`
            });
        }
        keywords.splice(index, 1);
        emojis.splice(index, 1);
        await client.database
            .prepare('UPDATE autoreact SET keyword = ?, emoji = ? WHERE client_id = ?')
            .run(JSON.stringify(keywords), JSON.stringify(emojis), 'key');
        return message.reply({
            content: `Removed the keyword \`${keyword}\` from auto-reactions.`
        });
    }
    catch {
        return message.reply(`An error occurred while removing auto-reaction.`);
    }
}
async function handleConfig(client, message) {
    try {
        const data = (await client.database.prepare('SELECT * FROM autoreact WHERE client_id = ?').get('key'));
        const keywords = JSON.parse(data.keyword || '[]');
        if (keywords.length === 0) {
            return message.reply(`No auto-reactions found.`);
        }
        const pageItems = keywords.map((keyword, i) => `\`[${i + 1}]\` | \`${keyword}\``);
        return message.reply({
            content: `**Auto-Reactions:**\n${pageItems.join('\n')}`
        });
    }
    catch (err) {
        return message.reply(`An error occurred while fetching auto-reactions.`);
    }
}
async function handleReset(client, message) {
    try {
        await client.database
            .prepare('UPDATE autoreact SET keyword = ?, emoji = ? WHERE client_id = ?')
            .run(JSON.stringify([]), JSON.stringify([]), 'key');
        return message.reply(`The auto-reaction database has been reset.`);
    }
    catch (err) {
        return message.reply(`An error occurred while resetting auto-reactions.`);
    }
}
export { handleAddReact, handleRemoveReact, handleConfig, handleReset };
