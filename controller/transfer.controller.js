const db = require('../db');
const shortid = require('shortid');

module.exports = {
  create: function(req, res) {
      res.render('transfer/create', {
        csrfToken: req.csrfToken(),
      });
  },

  postCreate: function(req, res) {
    db.get('transfers').push({
      id: shortid.generate(),
      accountId: req.body.accountId,
      amount: parseInt(req.body.amount),
      userId: res.locals.userInfo.id,
    }).write();
    res.redirect('back')
  },
}