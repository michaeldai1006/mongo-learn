const mongoose = require('../services/mongo.conn');

// Order schema
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    item_name: { type: String, required: true },
});

// Order model class
const Order = mongoose.model('Order', orderSchema);

// Export
module.exports = Order;