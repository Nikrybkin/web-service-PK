'use strict';

const deliveryData = require('../data/deliveries');

const getDeliveries = async (req, res, next) => {
    try {
        const deliveries = await deliveryData.getDeliveries();
        res.send(deliveries);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getDelivery =  async (req, res, next) => {
    try {
        const DeliveryID = req.params.id;
        const oneDelivery = await deliveryData.getDeliveryById(DeliveryID);
        res.send(oneDelivery)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addDelivery =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await deliveryData.createDelivery(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateDelivery = async (req, res, next) => {
    try {
        const DeliveryID = req.params.id;
        const data = req.body;
        const updated = await deliveryData.updateDelivery(DeliveryID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteDelivery = async (req, res, next) => {
    try {
        const DeliveryID = req.params.id;
        const deleteDelivery = await deliveryData.deleteDelivery(DeliveryID);
        res.send(deleteDelivery)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getDeliveries,
    getDelivery,
    addDelivery,
    updateDelivery,
    deleteDelivery
}