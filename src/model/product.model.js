const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");

const productModel = {
  query: (queryParams, sortType = "asc", limit = 5, offset = 0) => {
    //default data if postman zero data, show data offset 5
    if (queryParams.search && queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' AND category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit}`;
    } else if (queryParams.search || queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' OR category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit}`;
    } else {
      return `ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`; // add offset pagination but not clear
    }
  },
  //get biasanya butuh filter-filter
  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM products ${this.query(
          queryParams,
          queryParams.sortBy,
          queryParams.limit,
          queryParams.page //add pagination
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
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from products WHERE id ='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },
  add: ({ title, img, price, category }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO products (id, title, img, price, category) VALUES ('${uuidv4()}','${title}','${img}','${price}','${category}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ title, img, price, category });
          }
        }
      );
    });
  },
  //update patch
  update: ({ id, title, img, price, category }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category]
          db.query(
            `UPDATE products SET title='${
              title || result.rows[0].title
            }', img='${img || result.rows[0].img}', price='${
              price || result.rows[0].price
            }', category='${
              category || result.rows[0].category
            }' WHERE id ='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({ id, title, img, price, category });
              }
            }
          );
        }
      });
    });
  },

  // update put eksplorasi sendiri
  //   update: (req, res) => {},
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from products WHERE id ='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete data");
        }
      });
    });
  },
};

module.exports = productModel;
