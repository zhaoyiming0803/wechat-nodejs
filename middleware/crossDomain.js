module.exports = async (ctx, next) => {
  const allowedOrigin = [
    'https://web.0351zhuangxiu.com'
  ];

  if (allowedOrigin.includes(ctx.header.origin)) {
    ctx.set('Access-Control-Allow-Origin', '*');
  }

  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Token, Platform');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD');
  ctx.set('Content-Type', 'application/json; charset=utf-8');
  ctx.status = 200;

  await next();
}