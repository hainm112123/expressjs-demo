require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db');
const port = 5000;

const usersRoute = require('./routes/users.route');
const productsRoute = require('./routes/products.route');
const authRoute = require('./routes/auth.route');

const authMiddleware = require('./middleware/auth.middleware');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
// console.log(process.env.SESSION_SECRET) ;

app.use(function(req, res, next) {
  if (req.signedCookies.userId) {
    var user = db.get("users").find({id: req.signedCookies.userId}).value();
    if (user) res.locals.userInfo = user;
  }
  next();
})

app.get('/', function(req, res) {
  res.render('index', {
    name: 'world',
  });
});

app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/products', authMiddleware.requireAuth, productsRoute);
app.get('/logout', function(req, res) {
  res.clearCookie('userId');
  res.redirect('/');
});
app.use('/auth', authMiddleware.authed, authRoute);

app.listen(port, function() {
  console.log('Sever listening on port ' + port);
});