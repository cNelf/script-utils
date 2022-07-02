function curry(func) {
  return function curried(...args1) {
    if (args1.length >= func.length) {
      return func.apply(this, args1);
    } else {
      return function (...args2) {
        return curried.apply(this, args1.concat(args2));
      };
    }
  };
}

module.exports = curry;
