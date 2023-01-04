const db = require('../../helper/connection');
// const { v4: uuemailv4 } = require("uuemail");

const userModel = {
  query: () => {},
  // get biasanya butuh filter-filter
  get(queryParams) {
    console.log(queryParams);

    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users ${this.query(
          queryParams
          // queryParams.sortBy,
          // queryParams.limit,
          // queryParams.page //add pagination
        )}`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve(result.rows);
        }
      );
    });
  },
  getDetail: (email) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * from users WHERE email ='${email}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        }
        return resolve(result.rows[0]);
      });
    }),

  // post
  add: ({ email, password, phone }) =>
    new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (email, password, phone) VALUES ('${email}','${password}','${phone}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve({ email, password, phone });
        }
      );
    }),
  //
  // update patch belum clear
  update: ({ email, password, phone }) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        }
        db.query(
          `UPDATE products SET password='${
            password || result.rows[0].password
          }', phone='${phone}' WHERE email ='${email}'`,
          (err, result) => {
            if (err) {
              return reject(err.message);
            }
            return resolve({ email, password, phone });
          }
        );
      });
    }),
  // minor di sql tidak hapus data
  remove: (email) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE from users WHERE email ='${email}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        }
        return resolve('success delete data');
      });
    }),
};

module.exports = userModel;
