var Product = require('../../models/products.model');

module.exports = {
  index: async function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var products = await Product.find({});
    if (req.query.q) {
      var q = req.query.q.toLowerCase();
      products = products.filter(function(product) {
        return product.name.toLowerCase().indexOf(q) !== -1 || product.shortName.toLowerCase().indexOf(q) !== -1;
      });
    }
    res.json({
      products: products.slice((page - 1) * perPage, page * perPage),
      pageIndex: page,
      numPage: ((products.length  - 1) / perPage >> 0) + 1,
      baseUrl: req.baseUrl,
      searchValue: req.query.q,
    });
  }
}