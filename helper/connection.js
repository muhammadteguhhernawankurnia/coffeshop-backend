const { Client } = require("pg");
require("dotenv").config(); //add .env syntax

// console.log(process.env);
// console.log("HOST: " + process.env.USER);
// console.log("HOST: " + process.env.HOST);
// console.log("HOST: " + process.env.DATABASE);
// console.log("HOST: " + process.env.PASSWORD);
// console.log("HOST: " + process.env.PORT);

//deklarasi data dari .env
const USER = process.env.USER;
// console.log(USER);
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT;

// koneksi ke postgres
const db = new Client({
  user: USER, //defaultnya postgres
  host: HOST,
  database: DATABASE, //nama database kita
  password: PASSWORD, //master password
  port: PORT, //port postgres
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
