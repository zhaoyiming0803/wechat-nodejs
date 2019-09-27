const xml2js = require('xml2js');

exports.parseXML = xml => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, {trim: true}, (err, content) => {
      if (err) reject(err);
      else resolve(content);
    });
  });
}

exports.formatMessage = message => {
  const xmlMessage = {};
  
  if (!(typeof message === 'object')) return xmlMessage;

  const keys = Object.keys(message);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const item = message[key];

    if (!Array.isArray(item)) {
      continue;
    }

    const length = item.length;

    if (length === 1) {
      const [value] = item;

      xmlMessage[key] = typeof value === 'object'
        ? formatMessage(value)
        : (value || '').trim();
    } else {
      xmlMessage[key] = [];
      
      for (let j = 0; j < length; j += 1) {
        xmlMessage[key].push(formatMessage(item[j]));
      }
    }
  }

  return xmlMessage;
}