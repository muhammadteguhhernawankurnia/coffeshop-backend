const { v4: uuidv4 } = require('uuid');
const db = require('../../helper/connection');

const productModel = {
  query: (queryParams, sortType = 'asc') => {
    if (queryParams.search && queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' AND category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT${limit}`;
    }
    if (queryParams.search || queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' OR category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT${limit}`;
    }
    // return `ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`; // add offset pagination but not clear
  },
  // get biasanya butuh filter-filter
  // normal get
  // get(queryParams) {
  //   console.log(queryParams);

  //   return new Promise((resolve, reject) => {
  //     db.query(
  //       `SELECT * FROM products ${this.query(
  //         queryParams,
  //         queryParams.sortBy,
  //         queryParams.limit,
  //         queryParams.page // add pagination
  //       )}`,
  //       (err, result) => {
  //         if (err) {
  //           return reject(err.message);
  //         }
  //         return resolve(result.rows);
  //       }
  //     );
  //   });
  // },
  get(queryParams) {
    console.log(queryParams);
    const { page = 0, limit = 2 } = queryParams;

    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
        prod.id, prod.title, prod.price, prod.category,
        json_agg(row_to_json(prodimg)) images
        FROM products AS prod
        LEFT JOIN (SELECT  id_product, name, filename FROM product_images) AS prodimg 
        ON prod.id=prodimg.id_product
        GROUP BY prod.id 
        LIMIT ${limit} OFFSET (${page}-1)*${limit}
        `,
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
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO products (id, title, img, price, category) VALUES ('${uuidv4()}','${title}','${img}','${price}','${category}') RETURNING id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            db.query(
              `INSERT INTO product_images (id_image, id_product, name, filename) VALUES ($1, $2, $3, $4)`,
              [uuidv4(), result.rows[0].id, title, file[0].filename]
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
        } else {
          db.query(
            `SELECT * FROM product_images WHERE id_product='${id}'`,
            (err, result) => {
              if (err) return reject({ message: 'gambar gagal dihapus' });
              return resolve(result.rows);
            }
          );
        }
        // return resolve('success delete data');
      });
    }),
};

module.exports = productModel;
