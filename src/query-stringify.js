function queryStringify(obj) {
  let str = '';
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    str += str ? `&${key}=${value}` : `${key}=${value}`;
  });
  return str;
}

module.exports = queryStringify;
