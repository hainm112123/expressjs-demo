module.exports = {
  postCreate: function(req, res, next) {
    var inputValues = req.body;
    var errors = {
      name: !inputValues.name.length,
      phone: !inputValues.phone.length,
    }
    for (var key in errors) if (errors[key]) {
      res.render('users/create', {
        errors: errors,
        inputValues: inputValues,
      })
      return;
    }

    next();
  },
}