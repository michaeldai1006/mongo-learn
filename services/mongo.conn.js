const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-learn', { useNewUrlParser: true })
  .catch((err) => { console.log(err); });

  module.exports = mongoose;