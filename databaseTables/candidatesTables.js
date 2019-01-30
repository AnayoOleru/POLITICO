const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('database is connected now');
});

/**
 * Create user Tables
 */
const createCanTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      candidates(
        id UUID PRIMARY KEY NOT NULL,
        office UUID PRIMARY KEY NOT NULL,
        party UUID PRIMARY KEY NOT NULL,
        candidate UUID PRIMARY KEY NOT NULL,
        registered_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropCanTables = () => {
  const queryText = 'DROP TABLE IF EXISTS candidates';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('Table rcreation exited');
  process.exit(0);
});

module.exports = {
  createCanTables,
  dropCanTables
};

require('make-runnable');