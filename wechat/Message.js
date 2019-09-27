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
    this.reply(`您发送的内容是：${this.message.Content}`);
  }

  handleImage() {
    this.reply('您发送了一张图片');
  }

  handleVoice() {
    this.reply('您发送了一段语音');
  }

  handleVideo() {
    this.reply('您发送了一段视频');
  }

  handleShortvideo() {
    this.reply('您发送了一段短视频');
  }

  handleLocation() {
    this.reply('您发送了地理位置');
  }

  handleLink() {
    this.reply('您发送了一条链接');
  }

  handleEvent() {
    const eventMap = {
      subscribe() {
        this.reply('感谢关注我的测试公众号，可以加我个人微信号：1047832475，或点击菜单 GitHub，查看我的开源项目^_^');
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
        this.reply('您刚刚点击了拉取消息的菜单按钮');
      },

      VIEW() {
        this.reply('您刚刚点击了菜单跳转链接');
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
   * 暂时全部回复文本消息，后期有时间再拓展
   */
  reply(returnMsg) {
    const { ctx, message } = this;

    ctx.status = 200;
    ctx.type = 'application/xml';
    const resp = `<xml>
      <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
      <CreateTime>${parseInt(Date.now() / 10, 10)}</CreateTime>
      <MsgType><![CDATA[image]]></MsgType>
      <Image>
        <MediaId><![CDATA[http://mmbiz.qpic.cn/mmbiz_jpg/IvibBfZ4SxxaXWTsLRmic61TwyATUUIldR8tHRp9zvtfmLBRvvQcd1Jicia3OjTEDG0W8FtqTQ2GBhrSwTLTappNIw/0]]></MediaId>
      </Image>
    </xml>`;

    console.log(resp);

    ctx.body = resp;
  }
}

