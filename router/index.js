const Router = require('koa-router');
const router = new Router();

router.use('/wechat/entry', require('./entry').routes());
router.use('/wechat/auth', require('./auth').routes());

module.exports = router;