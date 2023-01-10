const { v4: uuidv4 } = require('uuid');
const db = require('../../helper/connection');

const productModel = {
  query: (queryParams, sortType = 'asc', limit = 5, offset = 0) => {
    // default data if postman zero data, show data offset 5
    if (queryParams.search && queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' AND category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`;
    }
    if (queryParams.search || queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' OR category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`;
    }
    return `ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`; // add offset pagination but not clear
  },
  // get biasanya butuh filter-filter
  get(queryParams) {
    console.log(queryParams);

    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM products ${this.query(
          queryParams,
          queryParams.sortBy,
          queryParams.limit,
          queryParams.page // add pagination
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
  getDetail: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * from products WHERE id ='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        }
        return resolve(result.rows[0]);
      });
    }),

  add: ({ title, img, price, category, file }) => {
    const uuidProduct = uuidv4();
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO products (id, title, img, price, category) VALUES ('${uuidProduct}','${title}','${img}','${price}','${category}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            const uuidImage = uuidv4();
            db.query(
              `INSERT INTO product_images (id_image, id_product, name, filename) VALUES ($1, $2, $3, $4)`,
              [uuidImage, uuidProduct, title, file[0].filename]
            );
            return resolve({
              title,
              img,
              price,
              category,
              files: file,
            });
          }
        }
      );
    });
  },
  // update patch
  update: ({ id, title, img, price, category }) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        }
        // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category]
        db.query(
          `UPDATE products SET title='${title || result.rows[0].title}', img='${
            img || result.rows[0].img
          }', price='${price || result.rows[0].price}', category='${
            category || result.rows[0].category
          }' WHERE id ='${id}'`,
          (err, result) => {
            if (err) {
              return reject(err.message);
            }
            return resolve({
              id,
              title,
              img,
              price,
              category,
            });
          }
        );
      });
    }),

  remove: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE from products WHERE id ='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        }
        return resolve('success delete data');
      });
    }),
};

module.exports = productModel;
