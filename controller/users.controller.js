const shortid = require('shortid');
const db = require('../db');

var usersRef = db.get('users');

module.exports = {
  index: function(req, res) {
    res.render('users/index', {
      users: usersRef.value(),
    });
  },

  search: function(req, res) {
    var q = req.query.q;
    var users = usersRef.value();
    var matchUsers = users.filter(function(user) {
      return user.name.indexOf(q) !== -1;
    });
    res.render('users/index', {
      users: matchUsers,
      searchValue: q,
    });
  },

  create: function(req, res) {
    res.render('users/create');
  },

  viewUser: function(req, res) {
    var id = req.params.id;
    var user = usersRef.find({id: id}).value();
    res.render('users/view', {
      user: user,
    });
  },

  postCreate: function(req, res) {
    usersRef.push({id: shortid.generate(), name: req.body.name, phone: req.body.phone}).write();
    res.render('users/create');
  },
}