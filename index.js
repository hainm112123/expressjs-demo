const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;

const usersRoute = require('./routes/users.route');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
  res.render('index', {
    name: 'yuuhi',
  });
});

app.use('/users', usersRoute);

app.listen(port, function() {
  console.log('Sever listening on port ' + port);
});