const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const cors = require('./middleware/cors');

app.use(cors);
app.use(router.routes(), router.allowedMethods()); 

app.listen(8092, () => {
  console.log('wechant-nodejs application listen port 8092');
});
