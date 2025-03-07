import type { Message, PermissionResolvable } from 'discord.js-selfbot-v13';
import type Bumblebee from '../base/Client';

export interface Command {
  name: string;
  aliases: string[];
  UserPerms: PermissionResolvable[];
  BotPerms: PermissionResolvable[];
  aboveRole: boolean;
  ownerOnly: boolean;
  run(client: Bumblebee, message: Message, args: string[]): Promise<unknown>;
}
