'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getOrders = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('orders');
        const list = await pool.request().query(sqlQueries.ordersList);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}

const getOrderById = async (OrderID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('orders');
        const oneOrder = await pool.request().input('OrderID', sql.Int, OrderID).query(sqlQueries.orderById)
        return oneOrder.recordset;
    } catch (err) {
        return err.message
    }
}

const createOrder = async (orderData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('orders');
        const insertOrder = await pool.request()
            .input('DeliveryID', sql.Int, orderData.DeliveryID)
            .input('CustomerID', sql.Int, orderData.CustomerID)
            .input('ProductID', sql.Int, orderData.ProductID)
            .input('OrderCount', sql.Int, orderData.OrderCount)
            .input('Date', sql.Date, orderData.Date)
            .query(sqlQueries.createOrder)
        return insertOrder.recordset;
    } catch (err) {
        return err.message;
    }
}

const updateOrder = async (OrderID, orderData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('orders');
        const update = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .input('DeliveryID', sql.Int, orderData.DeliveryID)
            .input('CustomerID', sql.Int, orderData.CustomerID)
            .input('ProductID', sql.Int, orderData.ProductID)
            .input('OrderCount', sql.Int, orderData.OrderCount)
            .input('Date', sql.Date, orderData.Date)
            .query(sqlQueries.updateOrder)
        return update.recordset;
    } catch (err) {
        return err.message;
    }
}

const deleteOrder = async (OrderID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('orders');
        const deleted = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .query(sqlQueries.deleteOrder);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}