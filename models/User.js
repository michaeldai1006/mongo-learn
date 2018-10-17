const mongoose = require('../services/mongo.conn');

// User schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true },
  sex: { type: String, required: false },
  email: { type: String, required: false },
  phone_number: { type: String, required: false }
});

// User model
const User = mongoose.model('User', userSchema);

// Export
module.exports = User;