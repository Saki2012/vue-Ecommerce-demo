const api = require('../controllers/productController.js');
const cart = require('../controllers/cartController.js');
const router = require('koa-router')();

/*
router.get('/todolist/:id', api.getProductById);
router.post('/todolist', api.getProductById);
router.delete('/todolist/:userId/:id', api.getProductById);
*/
router.post('/cart/create', cart.createCart);
router.post('/cart/list', cart.getCartByUserId);

module.exports = router; //導出router