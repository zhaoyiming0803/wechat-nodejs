const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();

const app = new Koa();

router.use('/wechat/auth', require('./router/auth').routes());

app.use(router.routes(), router.allowedMethods()); 

app.listen(8092, () => {
  console.log('wechant-nodejs application listen port 8092');
});
