// const db = require('../db');

// const usersRef = db.get('users');

const User = require('../models/users.model');

module.exports = {
  requireAuth: async function(req, res, next) {
    // console.log(req.cookies);
    if (!req.signedCookies.userId) {
      res.redirect('/auth/login');
      return;
    }

    // var user = usersRef.find({id: req.signedCookies.userId}).value();
    var user = await User.findById(req.signedCookies.userId);
    // console.log(user);
    if (!user) {
      res.redirect('/auth/login');
      return;
    }

    next();
  },

  authed: async function(req, res, next) {
    if (req.signedCookies.userId) {
      // var user = usersRef.find({id: req.signedCookies.userId}).value();
      var user = await User.findById(req.signedCookies.userId);
      if (user) {
        res.redirect('/');
        return;
      }
    }
    next();
  },
}