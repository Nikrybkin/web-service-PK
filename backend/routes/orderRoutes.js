'use strict';

const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

const {getOrders, getOrder, addOrder, updateOrder, deleteOrder} = orderController;

router.get('/orders', getOrders)
router.get('/orders/:id', getOrder)
router.post('/orders', addOrder)
router.put('/orders/:id', updateOrder)
router.delete('/orders/:id', deleteOrder)

module.exports = {
    routes: router
}