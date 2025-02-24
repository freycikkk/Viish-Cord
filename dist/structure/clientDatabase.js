import Database from 'better-sqlite3';
export const clientDatabase = async (client) => {
    client.database = new Database('./dist/database/database.sqlite');
};
