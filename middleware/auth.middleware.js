const db = require('../db');

const usersRef = db.get('users');

module.exports = {
  requireAuth: function(req, res, next) {
    // console.log(req.cookies);
    if (!req.cookies.userId) {
      res.redirect('/auth/login');
      return;
    }

    var user = usersRef.find({id: req.cookies.userId}).value();
    // console.log(user);
    if (!user) {
      res.redirect('/auth/login');
      return;
    }

    next();
  },

  authed: function(req, res, next) {
    if (req.cookies.userId) {
      var user = usersRef.find({id: req.cookies.userId}).value();
      if (user) {
        res.redirect('/');
        return;
      }
    }
    next();
  },
}