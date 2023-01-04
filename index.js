const { urlencoded, json } = require('express');
const express = require('express');
// const cors = require('cors')

const app = express();
// const { v4: uuidv4 } = require('uuid');
// const db = require('./helper/connection');
const router = require('./src/route/index'); // koneksi ke route folder

// defaultnya express itu gak nerima semua jenis form
// menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
// menerima json
app.use(json());
// app.use((cors){
// origin:['channa.com'],
// });//install cors
// app.use(cors());//ketolak
app.use('/api/v1', router); // versi aplikasi kita/prefiks

app.get('*', (req, res) => res.send({ status: 404, message: 'not found' }));

app.listen(3000, () => {
  console.log('backend success running on port 3000');
});
