var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  shortName: String,
  imgURL: String,
  description: String,
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;