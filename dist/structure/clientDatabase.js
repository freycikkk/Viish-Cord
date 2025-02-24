import Database from 'better-sqlite3';
import Viish from '../base/Client.js';
export const clientDatabase = async (client) => {
    client.database = new Database('./dist/database/database.sqlite');
};
