/** @format */

import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'afk',
  aliases: [],
  async run(client, message, args) {
    const userId = message.author.id;
    const afkReason = args.join(' ') || "I'm AFK ;-;";
    const afkTime = Date.now();

    const data = (await client.database.prepare('SELECT * FROM afk WHERE user_id = ?').get(userId)) as { reason: string; time: number };

    if (data) {
      return message.reply({
        content: `**${message.author.tag}**, you are already AFK. Your current AFK reason is: "${data.reason}" set at <t:${Math.floor(
          data.time / 1000
        )}:R>`
      });
    } else {
      await client.database.prepare('INSERT OR REPLACE INTO afk (user_id, reason, time) VALUES (?, ?, ?)').run(userId, afkReason, afkTime);

      return message.channel.send({
        content: `**${message.author.tag}**, Your AFK is now set to: ${afkReason}`
      });
    }
  }
} satisfies Command;
