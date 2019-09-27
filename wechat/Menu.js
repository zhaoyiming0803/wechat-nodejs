/**
 * 微信菜单
 */

const Wx = require('./Wx');
const request = require(`${cwd}/helper/request`);

class Menu extends Wx {
  async create () {
    const token = await this.getAccessToken('access_token');
    const options = {
      url: `${this.baseUrl}//menu/create?access_token=${token}`,
      method: 'post',
      body: {
        button: [
          {
            type: 'view',
            name: 'GitHub',
            url: 'https://github.com/zymfe'
          }
        ]
      }
    }
    const result = await request(options);
    console.log('create menu: ', result);
  }
}