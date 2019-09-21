const sha1 = require('sha1');
const getRawBody = require('raw-body');

const { parseXML, createXMLMessage } = require('../util');

module.exports = function auth (wechat) {
  return async (ctx, next) => {
    const { signature, timestamp, nonce, echostr } = ctx.query;
    const str = [wechat.token, timestamp, nonce].sort().join('');
    const sha1Str = sha1(str);
    const method = ctx.method.toLowerCase();

    if (method === 'get') {
      ctx.body = sha1Str === signature
        ? echostr
        : 'warning';
    } else if (method === 'post') {
      const data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset
      });
      const content = await parseXML(data);
      console.log('content', content);
      const message = createXMLMessage(content.xml);

      ctx.status = 200;
      ctx.type = 'application/xml';
      ctx.body = `<xml>
        <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
        <CreateTime>${parseInt(Date.now()/10, 10)}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${message.Content}]]></Content>
        <MsgId>${message.MsgId}</MsgId>
      </xml>`;
    }
  }
}