const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const crossDomain = require('./middleware/crossDomain');
const bodyParser = require('koa-bodyparser');

app.use(crossDomain);
app.use(bodyParser());
app.use(router.routes(), router.allowedMethods()); 

app.listen(8092, () => {
  console.log('wechant-nodejs application listen port 8092');
});
