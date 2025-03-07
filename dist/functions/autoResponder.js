async function handleAddResponse(client, message, name, response) {
    const data = (await client.database.prepare('SELECT * FROM autoresponder WHERE client_id = ?').get('key'));
    if (!data) {
        await client.database
            .prepare('INSERT INTO autoresponder (client_id, names, response) VALUES (?, ?, ?)')
            .run('key', JSON.stringify([]), JSON.stringify([]));
        return message.reply({
            content: `Please run this command again because earlier database was not set up`
        });
    }
    else {
        const names = JSON.parse(data.names || '[]');
        const responses = JSON.parse(data.response || '[]');
        if (!name) {
            return message.reply({
                content: `Prioritize mentioning the name for auto response.`
            });
        }
        else if (name.length >= 50) {
            return message.reply({
                content: `Prioritize mentioning the name below 50 characters.`
            });
        }
        else if (!response) {
            return message.reply({
                content: `Prioritize providing description for auto response.`
            });
        }
        else {
            if (names.includes(name)) {
                return message.reply({
                    content: `Already added \`${name}\` in auto response.`
                });
            }
            else {
                names.push(name);
                responses.push(response);
                await client.database
                    .prepare('UPDATE autoresponder SET names = ?, response = ? WHERE client_id = ?')
                    .run(JSON.stringify(names), JSON.stringify(responses), 'key');
                return message.reply({
                    content: `Added \`${name}\` in auto response.`
                });
            }
        }
    }
}
async function handleRemoveResponse(client, message, name) {
    const data = client.database.prepare(`SELECT names, response FROM autoresponder WHERE client_id = ?`).get('key');
    const names = JSON.parse(data.names || '[]');
    const responses = JSON.parse(data.response || '[]');
    const index = names.indexOf(name);
    if (index === -1) {
        return message.reply({
            content: `\`${name}\` is not found in the autoresponses.`
        });
    }
    names.splice(index, 1);
    responses.splice(index, 1);
    client.database
        .prepare(`UPDATE autoresponder SET names = ?, response = ? WHERE client_id = ?`)
        .run(JSON.stringify(names), JSON.stringify(responses), 'key');
    return message.reply({
        content: `Removed \`${name}\` from autoresponses.`
    });
}
async function handleConfig(client, message) {
    const data = (await client.database.prepare('SELECT * FROM autoresponder WHERE client_id = ?').get('key'));
    const names = JSON.parse(data.names || '[]');
    if (names.length === 0) {
        return message.reply('No autoresponses found in the database.');
    }
    const pageItems = names.map((name, i) => `\`[${i + 1}]\` | \`${name}\``);
    return await message.reply({
        content: `All Auto Responses\n${pageItems.join('\n')}`
    });
}
async function handleReset(client, message) {
    client.database.prepare(`UPDATE autoresponder SET names = ?, response = ? WHERE client_id = ?`).run(JSON.stringify([]), JSON.stringify([]), 'key');
    return message.reply(`Auto response database has been reset.`);
}
export { handleAddResponse, handleConfig, handleRemoveResponse, handleReset };
