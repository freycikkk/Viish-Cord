/** @format */

import type { ClientEvents } from 'discord.js-selfbot-v13';
import { readdirSync } from 'node:fs';
import type Viish from '../base/Client';
import type { Event } from '../interfaces/Events';

export const loadEvents = async (client: Viish) => {
  let loadedEventsCount = 0;

  for (const dir of readdirSync('./dist/events/')) {
    for (const file of readdirSync(`./dist/events/${dir}/`).filter((file) => file.endsWith('.js'))) {
      const { default: event } = (await import(`../events/${dir}/${file}`)) as { default?: Event<keyof ClientEvents> };

      if (event?.name && typeof event.run === 'function') {
        client.on(event.name as keyof ClientEvents, (...args) => void event.run(client, ...args));
        loadedEventsCount++;
      }
    }
  }

  console.log(`Successfully loaded ${loadedEventsCount} events.`);
};
