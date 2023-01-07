const express = require('express');

const router = express();

// import route
const productRoute = require('./product.route');
// end import route

// add users route
const userRoute = require('./user.route');
// add auth route
const authRoute = require('./auth.route');

router.get('/', (req, res) =>
  res.send('Backend server for coffee shop is running')
);
// router use sama dengan get kurang lebih
router.use('/products', productRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;
// agar bisa dipake dipanggil keluar
