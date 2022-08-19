const express = require('express');

const router = express.Router();
const controller = require('../controller/auth.controller');
const multer = require('multer');

const upload = multer({dest: "./public/uploads"});

router.get('/login', controller.login);
router.get('/signup', controller.signup);

router.post('/login', controller.postLogin);
router.post('/signup', upload.single('avatar'), controller.postSignup);

module.exports = router;
