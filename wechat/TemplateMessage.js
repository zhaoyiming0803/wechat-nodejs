/**
 * 微信模板消息
 */

const Wx = require('./Wx');
const cwd = process.cwd();
const request = require(`${cwd}/helper/request`);

module.exports = class TemplateMessage extends Wx {
  send (body) {
    const token = await this.getAccessToken('access_token');
    return await request({
      url: `${this.baseUrl}/message/template/send?access_token=${token}`,
      method: 'post',
      body
    });
  }
}