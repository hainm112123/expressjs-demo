const express = require('express');
const controller = require('../controller/transfer.controller');

const router = express.Router();

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

module.exports = router;