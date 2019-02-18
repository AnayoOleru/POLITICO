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
const createCand = () => {
  const queryText =
  `CREATE TABLE IF NOT EXISTS candidates(
    candidateId UUID UNIQUE NOT NULL,
    office UUID NOT NULL,
    officeName VARCHAR(128) NOT NULL,
    party UUID NOT NULL,
    partyName VARCHAR(128) NOT NULL,
    candidate UUID NOT NULL,
    candidateName VARCHAR(128) NOT NULL,
    FOREIGN KEY (office) REFERENCES office (id) ON DELETE CASCADE,
    FOREIGN KEY (party) REFERENCES party (id) ON DELETE CASCADE,
    FOREIGN KEY (candidate) REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (office, candidate)
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
const dropCand = () => {
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
  console.log('Table creation exited');
  process.exit(0);
});
module.exports = {
  createCand,
  dropCand
};

require('make-runnable');

