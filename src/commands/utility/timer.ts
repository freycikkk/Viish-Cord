/** @format */

import type { Command } from '../../interfaces/Commands.js';

export default {
  name: 'timer',
  aliases: [],
  async run(_client, message, args) {
    if (!args[0]) {
      return message.reply('Please specify a duration for the timer (e.g., `5m`, `10s`, `2h`).');
    }

    const timeInput = args[0];
    const duration = parseTime(timeInput);

    if (!duration) {
      return message.reply('Invalid time format. Use `s` for seconds, `m` for minutes, or `h` for hours (e.g., `5m`).');
    }

    message.reply(`⏳ Timer set for ${timeInput}. I'll notify you when it ends!`);

    setTimeout(() => {
      message.reply(`⏰ Time's up! Your ${timeInput} timer has ended.`);
    }, duration);
    return;
  }
} satisfies Command;

function parseTime(timeStr: string) {
  const match = timeStr.match(/^(\d+)([smh])$/);

  if (!match) return null;

  const value = parseInt(match[1] as string, 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    default:
      return null;
  }
}
