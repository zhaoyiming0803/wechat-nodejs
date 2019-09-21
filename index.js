const Koa = require('koa');
const sha1 = require('sha1');

const config = {
  appID: 'xxx',
  appsecret: 'xxx',
  token: 'xxx'
};

const app = new Koa();

app.use(async (ctx, next) => {
  const { signature, timestamp, nonce, echostr } = ctx.query;
  const str = [config.token, timestamp, nonce].sort().join('');
  const sha1Str = sha1(str);
  
  ctx.body = sha1Str === signature
    ? echostr
    : 'warning';
});

app.listen(8092);