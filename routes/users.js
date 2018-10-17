var express = require('express');
var router = express.Router();

// MongoDB Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-learn', { useNewUrlParser: true })
  .catch((err) => { console.log(err); });

// User model
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true },
  sex: { type: String, required: false },
  email: { type: String, required: false },
  phone_number: { type: String, required: false }
});
const User = mongoose.model('User', userSchema);

// Create a new user
router.post('/', async (req, res, next) => {
  try {
    const userInfo = {
      username: req.body.username,
      sex: req.body.sex,
      email: req.body.email,
      phone_number: req.body.phone_number
    }
    const user = new User(userInfo);
    const prods = await user.save();
    res.json(prods);
  } catch (err) {
    next(err);
  }
});

// Update user
router.put('/', async (req, res, next) => {
  try {
    const id = req.body.id;
    const doc = await User.findById(id);

    doc.username = req.body.username;
    doc.sex = req.body.sex;
    doc.email = req.body.email;
    doc.phone_number = req.body.phone_number;

    const prods = await doc.save();
    res.json(prods);
  } catch (err) {
    next(err);
  }
});

router.delete('/', async (req, res, next) => {
  const id = req.body.id;
  const prods = await User.findByIdAndRemove(id).exec();
  res.json(prods);
});

// Find all users
router.get('/', async (req, res, next) => {
  try {
    const doc = await User.find();
    res.json({
      status: true,
      message: "All users list",
      payload: { user_list: doc }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
