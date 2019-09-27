const sha1 = require('sha1');

const cwd = process.cwd();
const { wechat } = require(`${cwd}/config/index`);
const redis = require(`${cwd}/helper/redis`);
const request = require(`${cwd}/helper/request`);

module.exports = class Wx {
  constructor() {
    this.baseUrl = 'https://api.weixin.qq.com/cgi-bin';
  }

  async getAccessToken() {
    let accessToken = '';

    try {
      accessToken = await redis.get('access_token');
      if (!accessToken) {
        accessToken = await this.updateAccessToken();
      }
    } catch (e) {
      console.log('get access_token error: ', e);
      accessToken = await this.updateAccessToken();
    } finally {
      console.log('token', accessToken);
      return accessToken;
    }
  }

  async updateAccessToken () {
    let accessToken = '';

    try {
      const options = {
        url: `${this.baseUrl}/token`
          + '?grant_type=client_credential'
          + `&appid=${wechat.appID}`
          + `&secret=${wechat.appsecret}`,
        method: 'get'
      }
      const result = await request(options);

      // token 获取成功时，腾讯接口竟然不返回 errcode 字段 （-_-。）
      if (!result.errcode) {
        accessToken = result.access_token;
        await redis.set('access_token', accessToken);
        await redis.expire('access_token', result.expires_in - 200);
      }
    } catch (e) {
      console.log('update access_token error: ', e);
    } finally {
      const token = await redis.get('access_token');
      console.log('token ----- ', token);
      return accessToken;
    }
  }

  async getTicket () {
    let ticket = '';

    try {
      ticket = await redis.get('jsapi_ticket');
      if (!ticket) {
        ticket = await this.updateTicket();
      }
    } catch (e) {
      console.log('get jsapi_ticket error ', e);
      ticket = await this.updateTicket();
    } finally {
      console.log('ticket: ', ticket);
      return ticket;
    }
  }

  async updateTicket () {
    let ticket = '';

    try {
      const token = await this.getAccessToken();
      const options = {
        url: `${this.baseUrl}/ticket/getticket`
          + `?access_token=${token}`
          + `&type=jsapi`,
        method: 'get'
      }
      const result = await request(options);

      // ticket 获取成功时，腾讯接口返回 errcode 字段为 0，这一点与 access_token 不同
      if (result.errcode === 0) {
        ticket = result.ticket;
        await redis.set('jsapi_ticket', ticket);
        await redis.expire('jsapi_ticket', result.expires_in - 200);
      }
    } catch (e) {
      console.log('update jsapi_ticket error: ', e);
    } finally {
      const _ticket = await redis.get('jsapi_ticket');
      console.log('ticket ----- ', _ticket);
      return ticket;
    }
  }

  async createSignature (ctx) {
    const conditionMap = {
      noncestr: this.createNoncestr(),
      timestamp: Math.floor(Date.now() / 1000),
      url: ctx.header.referer,
      jsapi_ticket: await this.getTicket()
    };
    const str = Object.keys(conditionMap).sort().map(key => {
      return `${key}=${conditionMap[key]}`;
    }).join('&');
    const signature = sha1(str);

    console.log('signature: ', signature);

    return {
      timestamp: conditionMap.timestamp,
      nonceStr: conditionMap.noncestr,
      signature,
      url: conditionMap.url,
      appId: wechat.appID
    };
  }

  createNoncestr (step = 16) {
    const seed = '0123456789abcdefghijklmnopqrstuvwxyz';
    const seedLen = seed.length;
    let noncestr = '';

    for (let i = 0; i < step; i += 1) {
      noncestr += Math.floor(Math.random() * seedLen);
    }

    return noncestr;
  }
}