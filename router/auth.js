/**
 * 提供给前端使用的鉴权相关接口
 */
const sha1 = require('sha1');
const Router = require('koa-router');
const router = new Router();

const cwd = process.cwd();
const Wx = require(`${cwd}/wechat/Wx`);
const wx = new Wx();

/**
 * 获取微信 token
 */
router.get('/token', async (ctx, next) => {
  ctx.body = await wx.getAccessToken();
});

/**
 * 获取 jssdk 所需的签名等一系列配置
 */
router.get('/signature', async (ctx, next) => {
  ctx.body = await wx.createSignature(ctx);
});

module.exports = router;
