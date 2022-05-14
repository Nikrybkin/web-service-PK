'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getCustomers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('customers');
        const list = await pool.request().query(sqlQueries.customersList);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}

const getCustomerById = async (CustomerID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('customers');
        const oneCustomer = await pool.request().input('CustomerID', sql.Int, CustomerID).query(sqlQueries.customerById)
        return oneCustomer.recordset;
    } catch (err) {
        return err.message
    }
}

const createCustomer = async (customerData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('customers');
        const insertCustomer = await pool.request()
            .input('Name', sql.NVarChar(20), customerData.Name)
            .input('Adress', sql.NVarChar(50), customerData.Adress)
            .input('Phone', sql.NVarChar(20), customerData.Phone)
            .input('ContactName', sql.NVarChar(40), customerData.ContactName)
            .query(sqlQueries.createCustomer)
        return insertCustomer.recordset;
    } catch (err) {
        return err.message;
    }
}

const updateCustomer = async (CustomerID, customerData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('customers');
        const update = await pool.request()
        .input('CustomerID', sql.Int, CustomerID)
        .input('Name', sql.NVarChar(20), customerData.Name)
        .input('Adress', sql.NVarChar(50), customerData.Adress)
        .input('Phone', sql.NVarChar(20), customerData.Phone)
        .input('ContactName', sql.NVarChar(40), customerData.ContactName)
        .query(sqlQueries.updateCustomer)
        return update.recordset;
    } catch (err) {
        return err.message;
    }
}

const deleteCustomer = async (CustomerID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('customers');
        const deleted = await pool.request()
            .input('CustomerID', sql.Int, CustomerID)
            .query(sqlQueries.deleteCustomer);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}