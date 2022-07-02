const curry = require('../src/curry');

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

test('test curry', () => {
  expect(curriedSum(1, 2, 3)).toBe(6);
  expect(curriedSum(1)(2)(3)).toBe(6);
});
