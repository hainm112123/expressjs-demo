// const db = require('../db');
// const shortid = require('shortid');

const Transfer = require('../models/transfer.model');

module.exports = {
  create: function(req, res) {
    res.render('transfer/create', {
      csrfToken: req.csrfToken(),
    });
  },

  postCreate: async function(req, res) {
    // db.get('transfers').push({
    //   id: shortid.generate(),
    //   accountId: req.body.accountId,
    //   amount: parseInt(req.body.amount),
    //   // userId: res.locals.userInfo.id,
    // }).write();

    var newTransfer = new Transfer({
      accountId: req.body.accountId,
      amount: parseInt(req.body.amount),
      userId: res.locals.userInfo.id,
    });
    await newTransfer.save();

    res.redirect('back')
  },
}