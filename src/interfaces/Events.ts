/** @format */

import type { ClientEvents } from 'discord.js-selfbot-v13';
import type Bumblebee from '../base/Client';

export interface Event<T extends keyof ClientEvents> {
  name: T;
  run(client: Bumblebee, ...args: ClientEvents[T]): Promise<unknown>;
}
