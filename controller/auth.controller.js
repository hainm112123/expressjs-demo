const { application } = require('express');
const shortid = require('shortid');
const db = require('../db');
const md5 = require('md5');

const usersRef = db.get('users');

module.exports = {
  login: function(req, res) {
    res.render('auth/login');
  },

  postLogin: function(req, res) {
    var inputValues = req.body;
    var user = usersRef.find({email: inputValues.email}).value();
    if (!user) {
      res.render('auth/login', {
        inputValues: inputValues,
        errors: {
          email: 1,
        } 
      });
      return;
    }

    if (user.password !== md5(inputValues.password)) {
      res.render('auth/login', {
        inputValues: inputValues,
        errors: {
          password: 1,
        }
      })
    }

    res.cookie('userId', user.id, {signed: true});
    res.redirect('/');
  },

  signup: function(req, res) {
    res.render('auth/signup');
  },

  postSignup: function(req, res) {
    var inputValues = req.body;
    var user = usersRef.find({email: inputValues.email}).value();
    var errors = {
      emailExist: user !== undefined,
      emailLength: !inputValues.email.length,
      name: !inputValues.name.length,
      phone: !inputValues.phone.length,
      password: inputValues.password.length < 4,
      retypePassword: inputValues.retypePassword !== inputValues.password,
    };

    for (var key in errors) if (errors[key]) {
      res.render('auth/signup', {
        errors: errors,
        inputValues: inputValues,
      })
      return;
    }

    const defaultAvatar = "/uploads/4cb787a9affa096a7dd719936e65ce3c";
    usersRef.push({
      id: shortid.generate(), 
      name: inputValues.name,
      phone: inputValues.phone,
      email: inputValues.email,
      password: md5(inputValues.password),
      avatar: req.file ? "/" + req.file.path.split('/').slice(1).join('/') : defaultAvatar,
    }).write();

    user = usersRef.find({email: inputValues.email}).value();
    res.cookie('userId', user.id, {signed: true});
    res.redirect('/');
  }
}