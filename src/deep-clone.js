function deepClone(obj, hash = new WeakMap()) {
  // 处理循环引用
  if (hash.has(obj)) {
    return obj;
  }

  let res = null;
  const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];

  if (reference.includes(obj?.constructor)) {
    res = new obj.constructor(obj);
  } else if (Array.isArray(obj)) {
    res = [];
    obj.forEach((item, index) => {
      res[index] = deepClone(item);
    });
  } else if (obj !== null && typeof obj === 'object') {
    res = {};
    Object.keys(obj).forEach((key) => {
      res[key] = deepClone(obj[key]);
    });
    hash.set(obj, res);
  } else {
    res = obj;
  }

  return res;
}

module.exports = deepClone;
