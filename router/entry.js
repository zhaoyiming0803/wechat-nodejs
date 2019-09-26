/**
 * 微信请求入口
 */
const sha1 = require('sha1');
const Router = require('koa-router');
const router = new Router();

const cwd = process.cwd();
const { wechat } = require(`${cwd}/config`);
const Message = require(`${cwd}/wechat/Message`);
const message = new Message();

router.get('/', async (ctx, next) => {
  const { signature, timestamp, nonce, echostr } = ctx.query;
  const str = [wechat.token, timestamp, nonce].sort().join('');
  const sha1Str = sha1(str);

  ctx.body = sha1Str === signature
    ? echostr
    : 'warning';
});

router.post('/', async (ctx, next) => {
  await message.init(ctx);
});

module.exports = router;
