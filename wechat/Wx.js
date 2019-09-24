const { wechat } = require('../config/index');
const redis = require('../helper/redis');
const request = require('../helper/request');

module.exports = class Wx {
  constructor() {
    
  }

  async getAccessToken() {
    let accessToken = '';

    try {
      accessToken = await redis.get('access_token');
      if (!accessToken) {
        accessToken = await this.updateAccessToken();
      }
    } catch (e) {
      accessToken = await this.updateAccessToken();
    } finally {
      console.log('token', accessToken);
      return accessToken;
    }
  }

  async updateAccessToken () {
    const options = {
      url: 'https://api.weixin.qq.com/cgi-bin/token'
        + '?grant_type=client_credential'
        + `&appid=${wechat.appID}`
        + `&secret=${wechat.appsecret}`,
      method: 'get'
    }

    try {
      const result = await request(options);
      await redis.set('access_token', result.access_token);
      await redis.expire('access_token', parseInt(Date.now() / 1000, 10) + result.expires_in - 200);
      return result.access_token;
    } catch (e) {
      return '';
    } finally {
      const token = await redis.get('access_token');
      console.log('token ----- ', token);
    }
  }
}