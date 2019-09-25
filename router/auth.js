/**
 * 微信鉴权相关
 */
const sha1 = require('sha1');
const Router = require('koa-router');
const router = new Router();

const cwd = process.cwd();
const { wechat } = require(`${cwd}/config`);
const Message = require(`${cwd}/wechat/Message`);
const Wx = require(`${cwd}/wechat/Wx`);
const wx = new Wx();

/**
 * 响应微信发送的 Token 验证
 */
router.get('/url', async (ctx, next) => {
  const method = ctx.method.toLowerCase();

  if (method === 'get') {
    const { signature, timestamp, nonce, echostr } = ctx.query;
    const str = [wechat.token, timestamp, nonce].sort().join('');
    const sha1Str = sha1(str);
    
    ctx.body = sha1Str === signature
      ? echostr
      : 'warning';
  } else if (method === 'post') {
    const message = new Message();
    await message.init(ctx);
  }
});

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
