## wechat-nodejs

### 微信公众号开发

微信公众号开发文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1445241432

微信 JS-SDK 开发文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

微信支付开发文档： https://pay.weixin.qq.com/wiki/doc/api/index.html

企业付款开发文档（微信返现）：https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2

微信 JS 接口签名校验工具：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign

### 功能抢先看（测试号只允许有 100 个粉丝）

![image](https://github.com/zymfe/wx-public/raw/master/qrcode.png)

### 目前已实现

- [x] 获取 access_token
- [x] 获取签名
- [x] 使用 JS-SDK 所需配置（https://github.com/zymfe/VueNode/blob/dev/fe/src/libs/wx/index.ts)
- [x] 自定义公众号底部菜单栏
- [x] 消息接收与回复
- [x] 添加素材
- [x] 发送模板消息
- [x] 微信网页授权
- [x] 更多功能正在逐步开发中，看着开发文档做即可.

### 说明

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^
或者您可以 "follow" 一下，我会不断开源更多的有趣的项目! ^_^
如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR! ^\_^
当前服务使用 Koa 框架实现，如果对 Koa 实现原理感兴趣，可参考：《[逐行分析 Koa 源码](https://github.com/zymfe/notebook/tree/master/Node.js/Koa)》

参考：[PHP 版微信开发](https://github.com/zymfe/wechat-php)
