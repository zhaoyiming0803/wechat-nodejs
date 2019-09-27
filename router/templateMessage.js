/**
 * 微信模板消息路由
 */
const Router = require('koa-router');
const router = new Router();

const cwd = process.cwd();
const tpl = require(`${cwd}/wechat/TemplateMessage`);
const tpl = new TemplateMessage();

router.post('/send', async (ctx, next) => {
  ctx.body = await tpl.send(ctx.request.body);
});

module.exports = router;