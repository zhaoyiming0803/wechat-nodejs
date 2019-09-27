const message = {
  ToUserName: ['gh_4419580ed94c', ['2', '3']],
  FromUserName: ['oJG4N1EEVnkZeBZVXpImtj2qg0nI'],
  CreateTime: ['1569078343'],
  MsgType: ['text'],
  Content: ['2'],
  MsgId: ['22463803107983380'],
  a: [{b: ['1']}]
}

const formatMessage = message => {
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

      if (typeof value === 'object') {
        xmlMessage[key] = formatMessage(value);
      } else {
        xmlMessage[key] = (value || '').trim();
      }
    } else {
      xmlMessage[key] = [];
      for (let j = 0; j < length; j += 1) {
        xmlMessage[key].push(formatMessage(item[j]));
      }
    }
  }

  return xmlMessage;
}

console.log(formatMessage(message));