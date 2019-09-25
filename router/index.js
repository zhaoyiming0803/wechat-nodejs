const Router = require('koa-router');
const router = new Router();

router.use('/wechat/auth', require('./auth').routes());

module.exports = router;