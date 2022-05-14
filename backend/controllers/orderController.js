'use strict';

const orderData = require('../data/orders');

const getOrders = async (req, res, next) => {
    try {
        const orders = await orderData.getOrders();
        res.send(orders);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getOrder =  async (req, res, next) => {
    try {
        const OrderID = req.params.id;
        const oneOrder = await orderData.getOrderById(OrderID);
        res.send(oneOrder)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addOrder =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await orderData.createOrder(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const OrderID = req.params.id;
        const data = req.body;
        const updated = await orderData.updateOrder(OrderID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteOrder= async (req, res, next) => {
    try {
        const OrderID = req.params.id;
        const deleteOrder = await orderData.deleteOrder(OrderID);
        res.send(deleteOrder)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
}