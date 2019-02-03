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
    id UUID UNIQUE NOT NULL,
    office UUID NOT NULL,
    party UUID NOT NULL,
    candidate UUID NOT NULL,
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
module.exports = createCand;

require('make-runnable');

