const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  avatar: String,
  cart: Object,
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;