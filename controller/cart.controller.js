// const db = require('../db');

// const sessionsRef = db.get('sessions');
// const productsRef = db.get('products');
// const usersRef = db.get('users');

const User = require('../models/users.model');
const Product = require('../models/products.model');
const Session = require('../models/sessions.model');
const usersController = require('./users.controller');
const productsController = require('./products.controller');

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
      cart = session.cart ? session.cart : {};
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
      // usersRef.find({id: user.id}).set('cart.' + productId, counter + 1).write();
      var userDoc = await User.findById(user.id);
      if (!userDoc.cart) userDoc.cart = {};
      userDoc.cart[productId] = counter + 1 ;
      userDoc.markModified('cart');
      await userDoc.save();
      res.redirect('back');
      return;
    }

    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
      res.redirect('/products');
      return;
    }

    // var counter = sessionsRef.find({id: sessionId})
    //               .get('cart.' + productId, 0)
    //               .value();

    // sessionsRef.find({id: sessionId})
    //   .set('cart.' + productId, counter + 1)
    //   .write();
    var session = await Session.findById(sessionId);
    var counter = session.cart && session.cart[productId] ? session.cart[productId] : 0 ;
    if (!session.cart) session.cart = {};
    session.cart[productId] = counter + 1 ;
    session.markModified('cart');
    await session.save();
    // await Session.findByIdAndUpdate(sessionId, {cart[productId]: counter + 1})

    res.redirect('back');
  },

  decreaseAmount: async function(req, res) {
    var productId = req.params.productId;

    if (res.locals.userInfo) {
      var user = res.locals.userInfo;
      var counter = user.cart && user.cart[productId] ? user.cart[productId] : 0;
      var userDoc = await User.findById(user.id);
      if (counter === 1) {
        // usersRef.find({id: user.id}).unset('cart.' + productId).write();   
        delete userDoc.cart[productId];
      }
      else {
        // usersRef.find({id: user.id}).set('cart.' + productId, counter - 1).write();
        userDoc.cart[productId] = counter - 1 ;
      }
      userDoc.markModified('cart');
      await userDoc.save();

      res.redirect('back');
      return;
    }

    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
      res.redirect('/products');
      return;
    }

    // var counter = sessionsRef.find({id: sessionId}).get('cart.' + productId , 0).value();
    // if (counter === 1) sessionsRef.find({id: sessionId}).unset('cart.' + productId).write();
    // else sessionsRef.find({id: sessionId}).set('cart.' + productId, counter - 1).write();

    var sessionDoc = await Session.findById(sessionId);
    var counter = sessionDoc.cart[productId] ;
    if (counter === 1) {
      delete sessionDoc.cart[productId];
    }
    else {
      sessionDoc.cart[productId] = counter - 1 ;
    }
    sessionDoc.markModified('cart');
    await sessionDoc.save();

    res.redirect('back');
  },

  removeFromCart: async function(req, res) {
    var productId = req.params.productId;

    if (res.locals.userInfo) {
      var user = res.locals.userInfo;
      // usersRef.find({id: user.id}).unset('cart.' + productId).write();   
      var userDoc = await User.findById(user.id);
      delete userDoc.cart[productId];
      userDoc.markModified('cart') ; 
      await userDoc.save();

      res.redirect('back');
      return;
    }

    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
      res.redirect('/products');
      return;
    }

    // sessionsRef.find({id: sessionId}).unset('cart.' + productId).write();
    var sessionDoc = await Session.findById(sessionId);
    delete sessionDoc.cart[productId];
    sessionDoc.markModified('cart'); 
    await sessionDoc.save();

    res.redirect('back');
  },
}