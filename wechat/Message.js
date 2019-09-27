/**
 * 微信消息
 */
const getRawBody = require('raw-body');
const { parseXML, createXMLMessage } = require('../util');

module.exports = class Message {
  async init(ctx) {
    const data = await getRawBody(ctx.req, {
      length: ctx.length,
      limit: '1mb',
      encoding: ctx.charset
    });
    const content = await parseXML(data);
    const message = createXMLMessage(content.xml);
    const { MsgType } = message;
    const handler = 'handle' + MsgType.slice(0, 1).toUpperCase() + MsgType.slice(1);

    this.message = message;
    this.ctx = ctx;
    this[handler]();
  }

  handleText() {
    this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
  }

  handleImage() {
    this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
  }

  handleVoice() {
    this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
  }

  handleVideo() {
    this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
  }

  handleShortvideo() {
    this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
  }

  handleLocation() {
    this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
  }

  handleLink() {
    this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
  }

  handleEvent() {
    const eventMap = {
      subscribe() {
        this.replyText(`
          感谢关注我的测试公众号^_^
          可以点击下方菜单：
          - 加我个人微信号
          - 通过GitHub查看我所有开源项目源码
        `);
      },

      unsubscribe() {
        console.log('上报：某某用户取消了关注');
      },

      SCAN() {
        console.log('上报，扫描带参数的二维码，做其他业务逻辑处理');
      },

      LOCATION() {
        console.log('用户上报了地理位置');
      },

      CLICK() {
        this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
      },

      VIEW() {
        this.replyText(`欢迎来到我的测试公众号，可以点击下方菜单加我个人微信，聊聊代码^_^`);
      },

      TEMPLATESENDJOBFINISH() {
        console.log('模板消息发送完成：', this.message);
      }
    }

    const fn = eventMap[this.message.Event];
    if (fn) {
      fn.call(this);
    }
  }

  /**
   * 默认回复图片消息（个人微信二维码图），后期有时间再拓展
   */
  reply() {
    const { ctx, message } = this;

    ctx.status = 200;
    ctx.type = 'application/xml';
    const resp = `<xml>
      <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
      <CreateTime>${parseInt(Date.now() / 10, 10)}</CreateTime>
      <MsgType><![CDATA[image]]></MsgType>
      <Image>
        <MediaId><![CDATA[pO2BzgujoT8DDEo8wnhFA-nnuDhsz9r-wHu0v21eXUI]]></MediaId>
      </Image>
    </xml>`;

    console.log(resp);

    ctx.body = resp;
  }

  replyText(returnMsg) {
    const { ctx, message } = this;

    ctx.status = 200;
    ctx.type = 'application/xml';
    const resp = `<xml>
      <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
      <CreateTime>${parseInt(Date.now() / 10, 10)}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${returnMsg}]]></Content>
    </xml>`;

    ctx.body = resp;
  }
}

