const { Client } = require("pg");

// koneksi ke postgres
const db = new Client({
  user: "postgres", //defaultnya postgres
  host: "localhost",
  database: "coffee_shop", //nama database kita
  password: "0227814081", //master password
  port: 5432, //port postgres
});

db.connect((err) => {
  if (err) {
    console.log("db connection error", err);
  }
});

module.exports = db; //string yg bakal disini

// alternatif
// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "coffee_shop",
//   password: "0227814081",
//   port: 5432,
// });

// client.connect((err) => {
//   if (!err) {
//     console.log("database berhasil tersambung");
//   } else {
//     console.log("db error connection", err);
//   }
// });
