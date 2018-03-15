import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

const db = lowdb(new FileSync(path.resolve(__dirname, '../data.json')));

export default db;
