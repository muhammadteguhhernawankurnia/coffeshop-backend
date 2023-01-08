const express = require('express');
const verifyToken = require('../../helper/verifyToken');

const router = express();

// import controller
const productController = require('../controller/product.controller');

router.get('/', productController.get);
router.get('/:id', productController.getDetail);
router.post('/', verifyToken, productController.add);
router.patch('/:id', verifyToken, productController.update);
// delete diganti remove karena operator js
router.delete('/:id', verifyToken, productController.remove);

module.exports = router;
