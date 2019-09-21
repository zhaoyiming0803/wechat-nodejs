const sha1 = require('sha1');

const handleMessage = require('../wechat/message');

module.exports = function auth (wechat) {
  return async (ctx, next) => {
    const { signature, timestamp, nonce, echostr } = ctx.query;
    const str = [wechat.token, timestamp, nonce].sort().join('');
    const sha1Str = sha1(str);
    const method = ctx.method.toLowerCase();

    if (method === 'get') {
      ctx.body = sha1Str === signature
        ? echostr
        : 'warning';
    } else if (method === 'post') {
      await handleMessage(ctx);
    }
  }
}