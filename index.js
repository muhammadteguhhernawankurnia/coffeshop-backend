const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const db = require("./helper/connection");
const router = require("./src/route/index"); //koneksi ke route folder
const { v4: uuidv4 } = require("uuid");

//defaultnya express itu gak nerima semua jenis form
//menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
//menerima json
app.use(json());
//app.use((cors){
//origin:['channa.com'],
// });//install cors
// app.use(cors());//ketolak
app.use("/api/v1", router); //versi aplikasi kita/prefiks

//endpoint
// app.get("/products", (req, res) => {
//   //routes/view
//   db.query(
//     //model => yang berkaitan dengan schema database query
//     `SELECT * from products `,
//     (err, result) => {
//       //controller
//       if (err) {
//         return res.status(500).send({ message: err.message });
//       } else {
//         return res.status(200).send({ message: "success", data: result.rows });
//       }
//     }
//   );
// });

// app.get("/products/:id", (req, res) => {
//   const { id } = req.params;
//   db.query(`SELECT * from products WHERE id ='${id}'`, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     } else {
//       return res.status(200).send({ message: "success", data: result.rows[0] });
//     }
//   });
// });

// app.post("/products", (req, res) => {
//   const { title, img, price, category } = req.body;
//   db.query(
//     `INSERT INTO products (id, title, img, price, category) VALUES ('${uuidv4()}','${title}','${img}','${price}','${category}')`,
//     (err, result) => {
//       if (err) {
//         return res.status(500).send({ message: err.message });
//       } else {
//         return res.status(201).send({ message: "success", data: req.body });
//       }
//     }
//   );
// });

// app.put("/products/:id", (req, res) => {
//   const { title, img, price, category } = req.body;
//   const { id } = req.params;
//   db.query(
//     `UPDATE products SET title='${title}', img='${img}', price='${price}', category='${category}' WHERE id ='${id}'`,
//     (err, result) => {
//       if (err) {
//         return res.status(500).send({ message: err.message });
//       } else {
//         return res
//           .status(200)
//           .send({ message: `success update data ${id}`, data: res.body });
//       }
//     }
//   );
// });

// app.patch("/products/:id", (req, res) => {
//   //ngambil data dulu dari database berdasarkan id, kitaupdate
//   const { title, img, price, category } = req.body;
//   const { id } = req.params;
//   db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     } else {
//       // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category]
//       db.query(
//         `UPDATE products SET title='${title || result.rows[0].title}', img='${
//           img || result.rows[0].img
//         }', price='${price || result.rows[0].price}', category='${
//           category || result.rows[0].category
//         }' WHERE id ='${id}'`,
//         (err, result) => {
//           if (err) {
//             return res.status(500).send({ message: err.message });
//           } else {
//             return res
//               .status(200)
//               .send({ message: `success update data ${id}`, data: res.body });
//           }
//         }
//       );
//     }
//   });
// });

// app.delete("/products/:id", (req, res) => {
//   const { id } = req.params;
//   db.query(`DELETE from products WHERE id ='${id}'`, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     } else {
//       return res
//         .status(200)
//         .send({ message: `success delete data ${id}`, data: {} });
//     }
//   });
// });

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

app.listen(3000, () => {
  console.log("backend success running on port 3000");
});
