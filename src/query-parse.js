function queryParse(str) {
  if (str.indexOf("?") === 0) {
    str = str.slice(1);
  }

  const obj = {};
  const arr = str.split('&');

  arr.forEach(item => {
    const [key, value] = item.split('=');
    obj[key] = value;
  })

  return obj
}

module.exports = queryParse;
