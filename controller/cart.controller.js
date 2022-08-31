// const db = require('../db');

// const sessionsRef = db.get('sessions');
// const productsRef = db.get('products');
// const usersRef = db.get('users');

const User = require('../models/users.model');
const Product = require('../models/products.model');
const Session = require('../models/sessions.model');

module.exports = {
  index: async function(req, res) {
    var cart = {};
    var user = res.locals.userInfo;
    if (user) {
      cart = user.cart ? user.cart : {};
    }
    else {
      var sessionId = req.signedCookies.sessionId;
      if (!sessionId) {
        res.redirect('/products');
        return;
      }
      // cart = sessionsRef.find({id: sessionId}).value().cart;
      var session = await Session.findById(sessionId);
      cart = session.cart;
    }

    // var products = productsRef.value();
    var products = await Product.find();
    var cartProducts = [];
    for (var key in cart) {
      cartProducts.push({
        info: products.find(function(product){
          return product.id === key;
        }),
        amount: cart[key],
      });
    }
    res.render('cart/index', {
      cartProducts: cartProducts,
    }); 
  },

  addToCart: async function(req, res) {
    var productId = req.params.productId;

    if (res.locals.userInfo) {
      const user = res.locals.userInfo;
      var counter = user.cart && user.cart[productId] ? user.cart[productId] : 0;
      usersRef.find({id: user.id}).set('cart.' + productId, counter + 1).write();
      // await User.findByIdAndUpdate(user.id, )
      res.redirect('back');
      return;
    }

    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
      res.redirect('/products');
      return;
    }

    var counter = sessionsRef.find({id: sessionId})
                  .get('cart.' + productId, 0)
                  .value();

    sessionsRef.find({id: sessionId})
      .set('cart.' + productId, counter + 1)
      .write();
    
    res.redirect('back');
  },

  decreaseAmount: function(req, res) {
    var productId = req.params.productId;

    if (res.locals.userInfo) {
      var user = res.locals.userInfo;
      var counter = user.cart && user.cart[productId] ? user.cart[productId] : 0;
      if (counter === 1) usersRef.find({id: user.id}).unset('cart.' + productId).write();   
      else usersRef.find({id: user.id}).set('cart.' + productId, counter - 1).write();
      res.redirect('back');
      return;
    }

    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
      res.redirect('/products');
      return;
    }

    var counter = sessionsRef.find({id: sessionId}).get('cart.' + productId , 0).value();
    if (counter === 1) sessionsRef.find({id: sessionId}).unset('cart.' + productId).write();
    else sessionsRef.find({id: sessionId}).set('cart.' + productId, counter - 1).write();
    res.redirect('back');
  },

  removeFromCart: function(req, res) {
    var productId = req.params.productId;

    if (res.locals.userInfo) {
      var user = res.locals.userInfo;
      usersRef.find({id: user.id}).unset('cart.' + productId).write();   
      res.redirect('back');
      return;
    }

    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
      res.redirect('/products');
      return;
    }

    sessionsRef.find({id: sessionId}).unset('cart.' + productId).write();
    res.redirect('back');
  },
}