const express = require('express');

const router = express();

// import route
const productRoute = require('./product.route');
// end import route

// add users route
const userRoute = require('./user.route');

router.get('/', (req, res) => res.send('backend for coffee shop'));
// router use sama dengan get kurang lebih
router.use('/products', productRoute);
router.use('/users', userRoute);
// router.use('/users', userRoute) nanti bikin sendiri

module.exports = router;
// agar bisa dipake dipanggil keluar
