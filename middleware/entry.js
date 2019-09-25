const { wechat } = require(`${cwd}/config`);
const Message = require(`${process.cwd()}/wechat/Message`);

module.exports = async (ctx, next) => {
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
}