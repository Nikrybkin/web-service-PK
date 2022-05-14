'use strict';

const customerData = require('../data/customers');

const getCustomers = async (req, res, next) => {
    try {
        const customers = await customerData.getCustomers();
        res.send(customers);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getCustomer =  async (req, res, next) => {
    try {
        const CustomerID = req.params.id;
        const oneCustomer = await customerData.getCustomerById(CustomerID);
        res.send(oneCustomer)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addCustomer =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await customerData.createCustomer(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateCustomer = async (req, res, next) => {
    try {
        const CustomerID = req.params.id;
        const data = req.body;
        const updated = await customerData.updateCustomer(CustomerID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const CustomerID = req.params.id;
        const deleteCustomer = await customerData.deleteCustomer(CustomerID);
        res.send(deleteCustomer)
    } catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports = {
    getCustomers,
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
}