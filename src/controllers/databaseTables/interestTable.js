const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('database is connected now');
});

/**
 * Create user Tables
 */
const createInterest = () => {
  const queryText =
  `CREATE TABLE IF NOT EXISTS interest(
    interestId UUID UNIQUE NOT NULL,
    userId UUID NOT NULL,
    userName VARCHAR(128) NOT NULL,
    partyId UUID NOT NULL,
    partyName VARCHAR(128) NOT NULL,
    officeId UUID NOT NULL,
    officeName VARCHAR(128) NOT NULL,
    FOREIGN KEY (officeId) REFERENCES office (id) ON DELETE CASCADE,
    FOREIGN KEY (partyId) REFERENCES party (id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (officeId, userId)
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
};


/**
 * Drop Tables
 */
const dropInterest = () => {
  const queryText = 'DROP TABLE IF EXISTS interest';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('Table creation exited');
  process.exit(0);
});
module.exports = {
  createInterest,
  dropInterest,
};

require('make-runnable');
