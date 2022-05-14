'use strict';

const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const router = express.Router();

const {getDeliveries, getDelivery, addDelivery, updateDelivery, deleteDelivery} = deliveryController;

router.get('/deliveries', getDeliveries)
router.get('/deliveries/:id', getDelivery)
router.post('/deliveries', addDelivery)
router.put('/deliveries/:id', updateDelivery)
router.delete('/deliveries/:id', deleteDelivery)

module.exports = {
    routes: router
}