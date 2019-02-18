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
const createOfficeTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      petition(
        petition_id UUID PRIMARY KEY NOT NULL,
        user_id UUID NOT NULL,
        petition_title VARCHAR(128) NOT NULL,
        petition_body VARCHAR NOT NULL,
        created_date TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
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
const dropOfficeTables = () => {
  const queryText = 'DROP TABLE IF EXISTS petition';
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
  createOfficeTables,
  dropOfficeTables
};

require('make-runnable');