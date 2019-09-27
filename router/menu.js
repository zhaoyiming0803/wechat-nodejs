/**
 * 为前端提供操作公众号菜单的接口
 */
const Router = require('koa-router');
const router = new Router();

const cwd = process.cwd();
const Menu = require(`${cwd}/wechat/Menu`);
const menu = new Menu();

router.post('/create', async (ctx, next) => {
  ctx.body = await menu.create(ctx.request.body);
});

router.get('/delete', async (ctx, next) => {
  ctx.body = await menu.delete();
});

router.get('/get', async (ctx, next) => {
  ctx.body = await menu.get();
});

module.exports = router;