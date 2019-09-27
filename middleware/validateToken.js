const redis = require(`${process.cwd()}/helper/redis`);

module.exports = async (ctx, next) => {
  const privateToken = await redis.get('private_token');
  if (privateToken === ctx.request.header.token) {
    await next();
  } else {
    ctx.body = {
      errcode: -1,
      errmsg: 'invalid Token'
    };
  }
}