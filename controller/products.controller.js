const Product = require('../models/products.model');

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
    res.render('products/index', {
      products: products.slice((page - 1) * perPage, page * perPage),
      pageIndex: page,
      numPage: ((products.length  - 1) / perPage >> 0) + 1,
      baseUrl: req.baseUrl,
      searchValue: req.query.q,
    });
  },
  
  create: function(req, res) {
    res.render('products/create', {
      // csrfToken: req.csrfToken(),
    });
  },

  postCreate: async function(req, res) {
    var productInfo = req.body.select;
    if (productInfo === "null") {
      res.render('products/create', {
        notChoosed: 1,
        csrfToken: req.csrfToken(),
      });
    }

    var name="" , shortName="";
    for (var i = 0; i < productInfo.length; ++ i) {
      if (productInfo[i] === ' ') {
        name = productInfo.slice(i + 1, productInfo.length);
        break;
      }
      shortName += productInfo[i];
    }

    var newProduct = new Product({
      name: name,
      shortName: shortName,
      imgURL: "/image/products/" + shortName + ".png",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    });
    await newProduct.save();

    res.redirect('back');
  },

  search: async function(req, res) {
    var q = req.query.q.toLowerCase();
    var prodcuts = await Product.find() ;
    var matchedProducts = prodcuts.filter(function(product) {
      return product.name.toLowerCase().indexOf(q) !== -1 || product.shortName.toLowerCase().indexOf(q) !== -1;
    });
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    res.render('products/index', {
      products: matchedProducts.slice((page - 1) * perPage, page * perPage),
      pageIndex: page,
      numPage: ((matchedProducts.length - 1) / perPage >> 0) + 1,
      searchValue: req.query.q,
      baseUrl: req.baseUrl,
    })
  }
}