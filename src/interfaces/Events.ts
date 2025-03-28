/** @format */

import type { ClientEvents } from 'discord.js-selfbot-v13';
import type Viish from '../base/Client';

export interface Event<T extends keyof ClientEvents> {
  name: T;
  run(client: Viish, ...args: ClientEvents[T]): Promise<unknown>;
}
