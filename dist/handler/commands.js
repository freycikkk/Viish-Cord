import { readdirSync } from 'node:fs';
export const loadCommands = async (client) => {
    let loadedCommandsCount = 0;
    for (const dir of readdirSync('./dist/commands/')) {
        for (const file of readdirSync(`./dist/commands/${dir}/`).filter((file) => file.endsWith('.js'))) {
            const { default: pull } = (await import(`../commands/${dir}/${file}`));
            if (pull?.name) {
                client.commands.set(pull.name, pull);
                loadedCommandsCount++;
                if (Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        const existingCommand = [...client.commands.values()].find((c) => Array.isArray(c.aliases) ? c.aliases.includes(alias) : c.aliases === alias);
                        return existingCommand;
                    });
                }
            }
        }
    }
    console.log(`Successfully loaded ${loadedCommandsCount} commands.`);
};
