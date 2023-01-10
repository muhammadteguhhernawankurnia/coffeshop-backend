const express = require('express');
const formUpload = require('../../helper/formUpload');
const verifyToken = require('../../helper/verifyToken');
const router = express();

// import controller
const productController = require('../controller/product.controller');

router.get('/', productController.get);
router.get('/:id', productController.getDetail);
router.post('/', verifyToken, formUpload.array('img'), productController.add); // img dari column database
router.patch('/:id', verifyToken, productController.update);
// delete diganti remove karena operator js
router.delete('/:id', verifyToken, productController.remove);

module.exports = router;
