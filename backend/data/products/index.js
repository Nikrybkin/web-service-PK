'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getProducts = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const list = await pool.request().query(sqlQueries.productsList);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}

const getProductById = async (ProductID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const oneProduct = await pool.request().input('ProductID', sql.Int, ProductID).query(sqlQueries.productById)
        return oneProduct.recordset;
    } catch (err) {
        return err.message
    }
}

const createProduct = async (productData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const insertProduct = await pool.request()
            .input('Price', sql.Int, productData.Price)
            .input('Delivery', sql.NVarChar(20), productData.Delivery)
            .input('Description', sql.NVarChar(40), productData.Description )
            .query(sqlQueries.createProduct)
        return insertProduct.recordset;
    } catch (err) {
        return err.message;
    }
}

const updateProduct = async (ProductID, productData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const update = await pool.request()
            .input('ProductID', sql.Int, ProductID)
            .input('Price', sql.Int, productData.Price)
            .input('Delivery', sql.NVarChar(20), productData.Delivery)
            .input('Description', sql.NVarChar(40), productData.Description )
            .query(sqlQueries.updateProduct)
        return update.recordset;
    } catch (err) {
        return err.message;
    }
}

const deleteProduct = async (ProductID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const deleted = await pool.request()
            .input('ProductID', sql.Int, ProductID)
            .query(sqlQueries.deleteProduct);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}