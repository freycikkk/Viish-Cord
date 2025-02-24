import { Message } from 'discord.js-selfbot-v13';
import Viish from '../../base/Client.js';

export default {
  name: 'unafk',
  voteOnly: false,
  run: async (client: Viish, message: Message, _args: string[]) => {
    const authorAfkData = client.database.prepare('SELECT * FROM afk WHERE user_id = ?').get(message.author.id) as { time: number; reason: string };

    if (authorAfkData) {
      const afkDurationInSeconds = Math.floor((Date.now() - authorAfkData.time) / 1000);
      const afkDuration = formatDuration(afkDurationInSeconds);

      client.database.prepare('DELETE FROM afk WHERE user_id = ?').run(message.author.id);

      message.reply({
        content: `Welcome back <@${message.author.id}>! You were AFK for ${afkDuration}.`
      });
    } else {
      message.reply({
        content: `You were not marked as AFK, <@${message.author.id}>!`
      });
    }
  }
};

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
