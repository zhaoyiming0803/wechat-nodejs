const Koa = require('koa');

const { wechat } = require('./config');
const auth = require('./middleware/auth');

const app = new Koa();

app.use(auth(wechat));

app.listen(8092, () => {
  console.log('koa listen port 8092');
});