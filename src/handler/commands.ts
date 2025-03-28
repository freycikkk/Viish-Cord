/** @format */

import { readdirSync } from 'node:fs';
import type Viish from '../base/Client';
import type { Command } from '../interfaces/Commands';

export const loadCommands = async (client: Viish) => {
  let loadedCommandsCount = 0;

  for (const dir of readdirSync('./dist/commands/')) {
    for (const file of readdirSync(`./dist/commands/${dir}/`).filter((file) => file.endsWith('.js'))) {
      const { default: pull } = (await import(`../commands/${dir}/${file}`)) as { default?: Command };

      if (pull?.name) {
        client.commands.set(pull.name, pull);
        loadedCommandsCount++;

        if (Array.isArray(pull.aliases)) {
          pull.aliases.forEach((alias: string) => {
            const existingCommand = [...client.commands.values()].find((c) =>
              Array.isArray(c.aliases) ? c.aliases.includes(alias) : c.aliases === alias
            );
            return existingCommand;
          });
        }
      }
    }
  }

  console.log(`Successfully loaded ${loadedCommandsCount} commands.`);
};
