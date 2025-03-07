import Database from 'better-sqlite3';
import type Viish from '../base/Client.js';

export const clientDatabase = async (client: Viish) => {
  client.database = new Database('./dist/database/database.sqlite');
};
