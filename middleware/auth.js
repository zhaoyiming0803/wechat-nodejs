const sha1 = require('sha1');

const Message = require('../wechat/Message');
const Wx = require('../wechat/Wx');

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
      const message = new Message(ctx);
      await message.init();
    }

    const wx = new Wx();
    await wx.getAccessToken();
  }
}