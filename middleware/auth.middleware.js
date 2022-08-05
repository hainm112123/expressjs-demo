const db = require('../db');

const usersRef = db.get('users');

module.exports = {
  requireAuth: function(req, res, next) {
    // console.log(req.cookies);
    if (!req.signedCookies.userId) {
      res.redirect('/auth/login');
      return;
    }

    var user = usersRef.find({id: req.signedCookies.userId}).value();
    // console.log(user);
    if (!user) {
      res.redirect('/auth/login');
      return;
    }

    next();
  },

  authed: function(req, res, next) {
    if (req.signedCookies.userId) {
      var user = usersRef.find({id: req.signedCookies.userId}).value();
      if (user) {
        res.redirect('/');
        return;
      }
    }
    next();
  },
}