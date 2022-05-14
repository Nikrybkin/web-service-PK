'use strict';

const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();

const {getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer} = customerController;

router.get('/customers', getCustomers)
router.get('/customers/:id', getCustomer)
router.post('/customers', addCustomer)
router.put('/customers/:id', updateCustomer)
router.delete('/customers/:id', deleteCustomer)

module.exports = {
    routes: router
}