const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const password = '123456';

client.auth(password, () => {
  console.log('redis valid successfully')
});

client.on('connect', () => {
  console.log('redis connect successfully');
});

client.on('error', error => {
  console.log('redis connect error: ', error);
});


module.exports = {
  get (key) {
    return new Promise((resolve, reject) => {
      client.get(key, (error, data) => {
        if (error) reject();
        else resolve(data);
      });
    });
  },
  
  set (key, value) {
    return new Promise((resolve, reject) => {
      client.set(key, value, error => {
        if (error) reject();
        else resolve();
      });
    });
  },

  expire (key, time) {
    client.expire(key, time);
  }
};