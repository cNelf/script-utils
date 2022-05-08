function myNew(func, ...args) {
  const obj = {};
  func.apply(obj, args);
  return obj;
}

module.exports = myNew;
