module.exports = async (ctx, next) => {
  const allowedOrigin = [
    'https://web.0351zhuangxiu.com',
    'http://localhost:8080'
  ];

  if (allowedOrigin.includes(ctx.header.origin)) {
    ctx.set('Access-Control-Allow-Origin', '*');
  }

  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD');
  ctx.set('Content-Type', 'application/json; charset=utf-8');
  ctx.status = 200;

  await next();
}