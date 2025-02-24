import { Client, Collection } from 'discord.js-selfbot-v13';
import emojis from '../config/emoji.js';
import { clientHandler } from '../structure/clientHandler.js';
import { clientDatabase } from '../structure/clientDatabase.js';
import config from '../config/config.js';
export default class Viish extends Client {
    database;
    prefix = '.';
    emoji = emojis;
    address = 'ltc1q3m887hunymwfavs00srm6qkdgfput42fufztnr';
    perms = {
        owners: [this.user?.id]
    };
    commands = new Collection();
    events = new Collection();
    async connect() {
        await this.login(config.token);
        return this;
    }
    constructor() {
        super({
            sweepers: {
                messages: {
                    interval: 300,
                    filter: () => (message) => message.id !== this.user?.id
                },
                users: {
                    interval: 300,
                    filter: () => (user) => user.id !== this.user?.id
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
