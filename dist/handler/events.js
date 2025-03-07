import { readdirSync } from 'node:fs';
export const loadEvents = async (client) => {
    let loadedEventsCount = 0;
    for (const dir of readdirSync('./dist/events/')) {
        for (const file of readdirSync(`./dist/events/${dir}/`).filter((file) => file.endsWith('.js'))) {
            const { default: event } = (await import(`../events/${dir}/${file}`));
            if (event?.name && typeof event.run === 'function') {
                client.on(event.name, (...args) => void event.run(client, ...args));
                loadedEventsCount++;
            }
        }
    }
    console.log(`Successfully loaded ${loadedEventsCount} events.`);
};
