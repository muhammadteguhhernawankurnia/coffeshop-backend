require('dotenv').config();
const { urlencoded, json } = require('express');
// const cors = require('cors')
const express = require('express');
// variabel app adalah untuk menggunkan express
const app = express();
// const { v4: uuidv4 } = require('uuid');
// const db = require('./helper/connection');
// koneksi ke route folder
const router = require('./src/route/index');
// menerima application/x-www-form-urlencoded defaultnya express itu gak nerima semua jenis form
app.use(urlencoded({ extended: true }));
// menerima json
app.use(json());
// versi aplikasi kita/prefiks/route halaman awal
app.use('/api/v1', router);
// app.use((cors){
// origin:['channa.com'],
// });//install cors
// app.use(cors());//ketolak
// ketika route yang diakses tidak ada
app.get(
  '*',
  (req, res) => res.send({ status: 404, message: 'Page not found' })
  //untuk kirim response page html
  // res.sendFile('./index.html', { root: __dirname })
);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
