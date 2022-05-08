function bind(func, thisArg, ...args1) {
  return function (...args2) {
    return func.apply(thisArg, [...args1, ...args2]);
  };
}

module.exports = bind;
