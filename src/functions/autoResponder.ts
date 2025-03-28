/** @format */

import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../base/Client.js';

async function handleAddResponse(client: Viish, message: Message<true>, name: string, response: string) {
  const data = (await client.database.prepare('SELECT * FROM autoresponder WHERE client_id = ?').get('key')) as { names: string; response: string };

  if (!data) {
    await client.database
      .prepare('INSERT INTO autoresponder (client_id, names, response) VALUES (?, ?, ?)')
      .run('key', JSON.stringify([]), JSON.stringify([]));
    return message.reply({
      content: `Please run this command again because earlier database was not set up`
    });
  } else {
    const names = JSON.parse(data.names || '[]') as string[];
    const responses = JSON.parse(data.response || '[]') as string[];
    if (!name) {
      return message.reply({
        content: `Prioritize mentioning the name for auto response.`
      });
    } else if (name.length >= 50) {
      return message.reply({
        content: `Prioritize mentioning the name below 50 characters.`
      });
    } else if (!response) {
      return message.reply({
        content: `Prioritize providing description for auto response.`
      });
    } else {
      if (names.includes(name)) {
        return message.reply({
          content: `Already added \`${name}\` in auto response.`
        });
      } else {
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

async function handleRemoveResponse(client: Viish, message: Message<true>, name: string) {
  const data = client.database.prepare(`SELECT names, response FROM autoresponder WHERE client_id = ?`).get('key') as {
    names: string;
    response: string;
  };

  const names = JSON.parse(data.names || '[]') as string[];
  const responses = JSON.parse(data.response || '[]') as string[];
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

async function handleConfig(client: Viish, message: Message<true>) {
  const data = (await client.database.prepare('SELECT * FROM autoresponder WHERE client_id = ?').get('key')) as { names: string; response: string };

  const names = JSON.parse(data.names || '[]') as string[];
  if (names.length === 0) {
    return message.reply('No autoresponses found in the database.');
  }

  const pageItems = names.map((name: string, i: number) => `\`[${i + 1}]\` | \`${name}\``);

  return await message.reply({
    content: `All Auto Responses\n${pageItems.join('\n')}`
  });
}

async function handleReset(client: Viish, message: Message<true>) {
  client.database.prepare(`UPDATE autoresponder SET names = ?, response = ? WHERE client_id = ?`).run(JSON.stringify([]), JSON.stringify([]), 'key');

  return message.reply(`Auto response database has been reset.`);
}

export { handleAddResponse, handleConfig, handleRemoveResponse, handleReset };
