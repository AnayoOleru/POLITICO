import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.load();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const db = {
    query: (text, params) => pool.query(text, params),
};

export default db;