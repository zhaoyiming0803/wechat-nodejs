const Router = require('koa-router');
const router = new Router();
const validateToken = require(`${process.cwd()}/middleware/validateToken`);

router.use('/wechat/entry', require('./entry').routes());
router.use('/wechat/auth', require('./auth').routes());
router.use('/wechat/menu', validateToken, require('./menu').routes());
router.use('/wechat/templateMessage', validateToken, require('./templateMessage').routes());

module.exports = router;