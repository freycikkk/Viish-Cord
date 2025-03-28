import { loadCommands } from '../handler/commands.js';
import { loadEvents } from '../handler/events.js';
export const clientHandler = async (client) => {
    await loadCommands(client);
    await loadEvents(client);
};
