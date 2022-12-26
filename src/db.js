const { Pool } = require("pg");

// PostgreSQL DB Connection
const db = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

module.exports = db;
