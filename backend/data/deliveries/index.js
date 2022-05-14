'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getDeliveries = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('deliveries');
        const list = await pool.request().query(sqlQueries.deliveriesList);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}

const getDeliveryById = async (DeliveryID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('deliveries');
        const oneDelivery = await pool.request().input('DeliveryID', sql.Int, DeliveryID).query(sqlQueries.deliveryById)
        return oneDelivery.recordset;
    } catch (err) {
        return err.message
    }
}

const createDelivery = async (deliveryData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('deliveries');
        const insertDelivery = await pool.request()
            .input('DeliveryPrice', sql.Int, deliveryData.DeliveryPrice)
            .input('Speed', sql.Int, deliveryData.Speed)
            .query(sqlQueries.createDelivery)
        return insertDelivery.recordset;
    } catch (err) {
        return err.message;
    }
}

const updateDelivery = async (DeliveryID, deliveryData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('deliveries');
        const update = await pool.request()
            .input('DeliveryID', sql.Int, DeliveryID)
            .input('DeliveryPrice', sql.Int, deliveryData.DeliveryPrice)
            .input('Speed', sql.Int, deliveryData.Speed)
            .query(sqlQueries.updateDelivery)
        return update.recordset;
    } catch (err) {
        return err.message;
    }
}

const deleteDelivery = async (DeliveryID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('deliveries');
        const deleted = await pool.request()
            .input('DeliveryID', sql.Int, DeliveryID)
            .query(sqlQueries.deleteDelivery);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery
}