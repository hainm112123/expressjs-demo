const express = require('express');

const router = express.Router();
const controller = require('../controller/users.controller');
const validate = require('../validate/users.validate')

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.viewUser);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;