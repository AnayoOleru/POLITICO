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
const createVote = () => {
  const queryText =
  `CREATE TABLE IF NOT EXISTS votes(
    id UUID UNIQUE NOT NULL,
    created_on TIMESTAMP,
    created_by UUID NOT NULL, 
    office UUID NOT NULL,
    candidate UUID NOT NULL,
    FOREIGN KEY (office) REFERENCES office (id) ON DELETE CASCADE,
    FOREIGN KEY (candidate) REFERENCES candidates (candidateId) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE,
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
module.exports = createVote;

require('make-runnable');

