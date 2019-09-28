/**
 * 微信网页授权
 */

const Wx = require('./Wx');
const cwd = process.cwd();
const request = require(`${cwd}/helper/request`);
const { wechat } = require(`${cwd}/config`);

module.exports = class Authorization extends Wx {
  async getCode (redirectURI) {
    const url = `${this.openHost}/connect/oauth2/authorize` +
      `?appid=${wechat.appID}` + 
      `&redirect_uri=${redirectURI}` +
      '&response_type=code'+
      '&scope=snsapi_userinfo'+
      '&state=STATE#wechat_redirect';
  }

  async getAccessToken (code) {
    return await request({
      url: `${this.apiHost}/sns/oauth2/access_token` +
        `?appid=${wechat.appID}`+
        `&secret=${wechat.appsecret}`+
        `&code=${code}`+
        `&grant_type=authorization_code`,
      method: 'get'
    });
  }

  async getUserInfo (accessToken, openid) {
    return await request({
      url: `${this.apiHost}/sns/userinfo` +
        `?access_token=${accessToken}`+
        `&openid=${openid}`+
        '&lang=zh_CN',
      method: 'get'
    });
  }
}