'use strict';

const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = productController;

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', addProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

module.exports = {
    routes: router
}