const product = require('../controllers/productController.js');
const router = require('koa-router')();

router.get('/list', product.getProductListAndCategories);
router.get('/:id', product.getProductById);

module.exports = router;