/** @format */

import type { Message, User } from 'discord.js-selfbot-v13';
import type Viish from '../../base/Client.js';
import type { Event } from '../../interfaces/Events.js';

export default {
  name: 'messageCreate',
  run: async (client: Viish, message: Message) => {
    if (message.author.bot || message.author.id !== client.user?.id) return;
    const mentionedUsers = message.mentions.users;
    if (mentionedUsers.size > 0) {
      mentionedUsers.forEach((user: User) => {
        const mentionedUserAfkData = client.database.prepare('SELECT * FROM afk WHERE user_id = ?').get(user.id) as { time: number; reason: string };
        if (mentionedUserAfkData) {
          const afkDurationInSeconds = Math.floor((Date.now() - mentionedUserAfkData.time) / 1000);
          const afkDuration = formatDuration(afkDurationInSeconds);
          const sanitizedReason = mentionedUserAfkData.reason;
          message.reply({
            content: `**${user.tag}**, went afk for ${afkDuration}: ${sanitizedReason}`
          });
        }
      });
    }
  }
} satisfies Event<'messageCreate'>;

function formatDuration(seconds: number) {
  const days = Math.floor(seconds / 86400);
  seconds -= days * 86400;
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let duration = '';
  if (days > 0) {
    duration += `${days} day${days > 1 ? 's' : ''} `;
  }
  if (hours > 0) {
    duration += `${hours} hour${hours > 1 ? 's' : ''} `;
  }
  if (minutes > 0) {
    duration += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  }
  if (seconds > 0 || duration === '') {
    duration += `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }

  return duration;
}
