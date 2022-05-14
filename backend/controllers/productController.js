'use strict';

const productData = require('../data/products');

const getProducts = async (req, res, next) => {
    try {
        const products = await productData.getProducts();
        res.send(products);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getProduct =  async (req, res, next) => {
    try {
        const ProductID = req.params.id;
        const oneProduct = await productData.getProductById(ProductID);
        res.send(oneProduct)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addProduct =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await productData.createProduct(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const ProductID = req.params.id;
        const data = req.body;
        const updated = await productData.updateProduct(ProductID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const ProductID = req.params.id;
        const deleteProduct = await productData.deleteProduct(ProductID);
        res.send(deleteProduct)
    } catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}