/**
 * request promise
 */
const request = require('request');

module.exports = (options) => {
  const _options = Object.assign({
    json: true
  }, options);

  return new Promise((resolve, reject) => {
    request(_options, (error, response, body) => {
      if (error) reject(error);
      else resolve(body);
    });
  });
}