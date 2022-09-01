// const shortid = require('shortid');
// const db = require('../db');

// var usersRef = db.get('users');

var User = require('../models/users.model');

module.exports = {
  index: async function(req, res) {
    res.render('users/index', {
      // users: usersRef.value(),
      users: await User.find(),
    });
  },

  search: async function(req, res) {
    var q = req.query.q.toLowerCase();
    // var users = usersRef.value();
    var users = await User.find();
    var matchUsers = users.filter(function(user) {
      return user.name.toLowerCase().indexOf(q) !== -1;
    });
    res.render('users/index', {
      users: matchUsers,
      searchValue: req.query.q,
    });
  },

  create: function(req, res) {
    res.render('users/create', {
      // csrfToken: req.csrfToken(),
    });
  },

  viewUser: async function(req, res) {
    var id = req.params.id;
    // var user = usersRef.find({id: id}).value();
    var user = await User.findById(id);
    res.render('users/view', {
      user: user,
    });
  },

  postCreate: async function(req, res) {
    // usersRef.push({id: shortid.generate(), name: req.body.name, phone: req.body.phone}).write();
    var newUser = new User({
      name: req.body.name,
      phone: req.body.phone,
    });
    await newUser.save();

    res.redirect('back');
  },
}