/**
 * 微信菜单
 */

const Wx = require('./Wx');
const cwd = process.cwd();
const request = require(`${cwd}/helper/request`);

module.exports = class Menu extends Wx {
  async create (menu) {
    const token = await this.getAccessToken('access_token');
    const options = {
      url: `${this.apiHost}/cgi-bin/menu/create?access_token=${token}`,
      method: 'post',
      body: menu
    }
    return await request(options);
  }

  async get () {
    const token = await this.getAccessToken('access_token');
    const options = {
      url: `${this.apiHost}/cgi-bin/get_current_selfmenu_info?access_token=${token}`,
      method: 'get'
    }
    return await request(options);
  }

  async delete () {
    const token = await this.getAccessToken('access_token');
    const options = {
      url: `${this.apiHost}/cgi-bin/menu/delete?access_token=${token}`,
      method: 'get'
    }
    return await request(options);
  }
}