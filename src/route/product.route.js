const express = require('express');

const router = express();

// import controller
const productController = require('../controller/product.controller');

router.get('/', productController.get);
router.get('/:id', productController.getDetail);
router.post('/', productController.add);
// pu tidak dipakai karena tidak relate dengan aplikasi
// router.put("/", productController.update);
router.patch('/:id', productController.update);
router.delete('/:id', productController.remove);
// delete diganti remove karena operator js

module.exports = router;
