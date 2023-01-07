const { Client } = require('pg');
// add .env syntax
require('dotenv').config();
// deklarasi data dari .env
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;
// koneksi ke PostgreSQL
const db = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.log('Database connection error', err);
  }
});

module.exports = db;
