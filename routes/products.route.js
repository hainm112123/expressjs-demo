const express = require('express');

const router = express.Router();
const controller = require('../controller/products.controller') ;

router.get('/', controller.index);
router.get('/create', controller.create);
// router.get('/search', controller.search);

router.post('/create', controller.postCreate);

module.exports = router;