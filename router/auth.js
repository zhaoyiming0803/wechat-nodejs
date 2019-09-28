/**
 * 微信网页授权 或 前端需要的各种 token、ticket
 */
const sha1 = require('sha1');
const Router = require('koa-router');
const router = new Router();

const cwd = process.cwd();
const Wx = require(`${cwd}/wechat/Wx`);
const wx = new Wx();
const Authorization = require(`${cwd}/wechat/Authorization`);
const authorization = new Authorization();

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

/**
 * 网页授权获取 code
 */
router.post('/authorizeCode', async (ctx, next) => {
  ctx.body = {
    url: authorization.createUrlForAuthCode(ctx.request.body.redirectURI)
  };
});

/**
 * 网页授权获取用户信息（先获取授权token）
 */
router.post('/authorizeUserInfo', async (ctx, next) => {
  const result = await authorization.getAccessToken(ctx.query.code);

  if (result.errcode) {
    ctx.body = result;
  } else {
    const userInfo = await authorization.getUserInfo(result.access_token, result.openid);
    ctx.body = userInfo;
  }
});

module.exports = router;
