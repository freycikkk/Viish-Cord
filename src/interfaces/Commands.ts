/** @format */

import type { Message } from 'discord.js-selfbot-v13';
import type Viish from '../base/Client';

export interface Command {
  name: string;
  aliases: string[];
  run(client: Viish, message: Message<true>, args: string[]): Promise<unknown>;
}
