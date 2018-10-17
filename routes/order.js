var express = require('express');
var router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res, next) => {
    try {
        const orderInfo = {
            user_id: req.body.user_id,
            amount: req.body.amount,
            item_name: req.body.item_name
        }
        const order = new Order(orderInfo);
        const prods = await order.save();
        res.json(prods);
    } catch (err) {
        next(err);
    }
});

// Update order
router.put('/', async (req, res, next) => {
    try {
        const id = req.body.id;
        const doc = await Order.findById(id);

        doc.user_id = req.body.user_id;
        doc.amount = req.body.amount;
        doc.item_name = req.body.item_name;

        const prods = await doc.save();
        res.json(prods);
    } catch (err) {
        next(err);
    }
});

// Delete order
router.delete('/', async (req, res, next) => {
    const id = req.body.id;
    const prods = await Order.findByIdAndRemove(id).exec();
    res.json(prods);
});

// Find all orders
router.get('/', async (req, res, next) => {
    try {
        const doc = await Order.find();
        res.json({
            status: true,
            message: "All orders list",
            payload: { order_list: doc }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
