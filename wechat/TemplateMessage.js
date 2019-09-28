/**
 * 微信模板消息
 */

const Wx = require('./Wx');
const cwd = process.cwd();
const request = require(`${cwd}/helper/request`);

module.exports = class TemplateMessage extends Wx {
  async send (body) {
    const token = await this.getAccessToken('access_token');
    return await request({
      url: `${this.apiHost}/cgi-bin/message/template/send?access_token=${token}`,
      method: 'post',
      body
    });
  }
}