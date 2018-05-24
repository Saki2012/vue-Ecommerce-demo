const auth = require('../controllers/user.js');
const router = require('koa-router')();

router.get('/user/:id', auth.getUserInfo);
router.post('/user', auth.postUserAuth);
router.post('/user/create', auth.createUser);


module.exports = router; 