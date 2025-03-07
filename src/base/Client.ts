/** @format */

import type { Message, User } from 'discord.js-selfbot-v13';
import { Client, Collection } from 'discord.js-selfbot-v13';
import emojis from '../config/emoji.js';
import { clientHandler } from '../structure/clientHandler.js';
import { clientDatabase } from '../structure/clientDatabase.js';
import config from '../config/config.js';
import type { Database } from 'better-sqlite3';
import type { Command } from '../interfaces/Commands.js';
import type { Event } from '../interfaces/Events.js';

export default class Viish extends Client {
  database!: Database;
  prefix = '.';
  emoji = emojis;
  address = 'ltc1q3m887hunymwfavs00srm6qkdgfput42fufztnr';
  perms = {
    owners: [this.user?.id]
  };
  commands = new Collection<string, Command>();
  events = new Collection<string, Event<any>>();
  async connect() {
    await this.login(config.token);
    return this;
  }
  constructor() {
    super({
      sweepers: {
        messages: {
          interval: 300,
          filter: () => (message: Message) => message.id !== this.user?.id
        },
        users: {
          interval: 300,
          filter: () => (user: User) => user.id !== this.user?.id
        }
      }
    });
    this.once('ready', async () => {
      await clientDatabase(this);
      await clientHandler(this);
      console.log(`Logged in as ${this.user?.username}`);
    });
  }
}
