var Session = require('../models/sessions.model');

module.exports = async function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    // var sessionId = shortid.generate();
    var session = new Session({
      cart: {},
    });
    await session.save();
    var sessionId = session._id.toString();
    // console.log(sessionId);
    res.cookie('sessionId', sessionId, {
      signed: true,
    });
    
    // db.get('sessions').push({
    //   id: sessionId,
    //   cart: {},
    // }).write();
    res.redirect('back');
    return;
  }
  
  next();
}