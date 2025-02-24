import Viish from '../base/Client.js';
import { loadCommands } from '../handler/commands.js';
import { loadEvents } from '../handler/events.js';

export const clientHandler = async (client: Viish) => {
  await loadCommands(client);
  await loadEvents(client);
};
