const express = require('express');

const router = express.Router();
const controller = require('../controller/auth.controller');

router.get('/login', controller.login);
router.get('/signup', controller.signup);

router.post('/login', controller.postLogin);
router.post('/signup', controller.postSignup);

module.exports = router;
