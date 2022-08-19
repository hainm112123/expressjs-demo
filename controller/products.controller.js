const shortid = require('shortid');
const db = require('../db');

const productsRef = db.get('products');

module.exports = {
  index: function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var products = productsRef.value();
    res.render('products/index', {
      products: products.slice((page - 1) * perPage, page * perPage),
      pageIndex: page,
      numPage: ((products.length  - 1) / perPage >> 0) + 1,
    });
  },
  
  create: function(req, res) {
    res.render('products/create', {});
  },

  postCreate: function(req, res) {
    var productInfo = req.body.select;
    if (productInfo === "null") {
      res.render('products/create', {
        notChoosed: 1,
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

    productsRef.push({
      id: shortid.generate(),
      name: name,
      shortName: shortName,
      imgURL: "/image/products/" + shortName + ".png",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    }).write();

    res.render('products/create');
  }
}