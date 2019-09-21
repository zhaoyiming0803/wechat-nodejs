/**
 * 微信消息
 */
const getRawBody = require('raw-body');
const { parseXML, createXMLMessage } = require('../util');

const handler = {
  text (ctx, content) {
    putMessage(ctx, content, '您刚刚发给我一段文字', 'text');
  },

  event () {

  }
}

function putMessage (ctx, content, returnMsg, type) {
  const message = createXMLMessage(content.xml);
  
  ctx.status = 200;
  ctx.type = 'application/xml';
  const resp = `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${parseInt(Date.now()/10, 10)}</CreateTime>
    <MsgType><![CDATA[${type}]]></MsgType>
    <Content><![CDATA[${returnMsg}]]></Content>
    <MsgId>${message.MsgId}</MsgId>
  </xml>`;

  console.log(resp);

  ctx.body = resp;
}

module.exports = async function handleMessage (ctx) {
  const data = await getRawBody(ctx.req, {
    length: ctx.length,
    limit: '1mb',
    encoding: ctx.charset
  });
  const content = await parseXML(data);
  const [MsgType] = content.xml.MsgType;
  
  handler[MsgType](ctx, content);
}
