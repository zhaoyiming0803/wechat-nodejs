/**
 * 微信消息
 */
const getRawBody = require('raw-body');
const { parseXML, createXMLMessage } = require('../util');

module.exports = class Message {
  constructor () {
    
  }

  async init (ctx) {
    this.ctx = ctx;
    const data = await getRawBody(ctx.req, {
      length: ctx.length,
      limit: '1mb',
      encoding: ctx.charset
    });
    const content = await parseXML(data);
    const [MsgType] = content.xml.MsgType;
    const handler = 'handle' + MsgType.slice(0, 1).toUpperCase() + MsgType.slice(1);

    this[handler](content);
  }

  handleText (content) {
    this.putMessage(content, '您刚刚发给我一段文字', 'text');
  }

  handleEvent () {

  }

  putMessage (content, returnMsg, type) {
    const ctx = this.ctx;
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
}

