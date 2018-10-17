var express = require('express');
var router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

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
    const prods = await Order.findByIdAndRemove(id);
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

// Find who placed the order
router.get('/user/:order_id', async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.order_id);
        const user = await User.findById(order.user_id);

        res.json({
            status: true,
            message: "User found",
            payload: { user: user }
        });
    } catch (err) {
        next(err);
    }
});

// Join
router.get('/join/:order_id', async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.order_id).populate('user_id');

        res.json({
            status: true,
            message: "Order found",
            payload: { order: order }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
