const db = require("../../helper/connection");
// const { v4: uuemailv4 } = require("uuemail");

const userModel = {
  query: (queryParams, sortType = "asc", limit = 5) => {
    //default data if postman zero data, show data offset 5
    // if (queryParams.search && queryParams.cat) {
    //   return `WHERE password LIKE '%${queryParams.search}%' AND category LIKE '%${queryParams.cat}%' ORDER BY password ${sortType} LIMIT ${limit} OFFSET ${offset}`;
    // } else if (queryParams.search || queryParams.cat) {
    //   return `WHERE password LIKE '%${queryParams.search}%' OR category LIKE '%${queryParams.cat}%' ORDER BY password ${sortType} LIMIT ${limit} OFFSET ${offset}`;
    // } else {
    //   return `ORDER BY password ${sortType} LIMIT ${limit} OFFSET ${offset}`; // add offset pagination but not clear
    // }
  },
  //get biasanya butuh filter-filter
  get: function (queryParams) {
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
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  getDetail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from users WHERE email ='${email}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },

  // post
  add: ({ email, password, phone }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (email, password, phone) VALUES ('${email}','${password}','${phone}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ email, password, phone });
          }
        }
      );
    });
  },
  //
  //update patch belum clear
  update: ({ email, password, phone }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `UPDATE products SET password='${
              password || result.rows[0].password
            }', phone='${phone}' WHERE email ='${email}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({ email, password, phone });
              }
            }
          );
        }
      });
    });
  },
  //minor di sql tidak hapus data
  remove: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from users WHERE email ='${email}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete data");
        }
      });
    });
  },
};

module.exports = userModel;
