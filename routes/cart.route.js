const express = require('express');
const controller = require('../controller/cart.controller');

const router = express.Router();

router.get('/', controller.index);
router.get('/add/:productId', controller.addToCart);
router.get('/inc/:productId', controller.addToCart);
router.get('/dec/:productId', controller.decreaseAmount);
router.get('/remove/:productId', controller.removeFromCart);

module.exports = router;