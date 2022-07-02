const flat = require('../src/flat');

test('test flat', () => {
  const arr = [1, [2, [3, [4]], 5]];
  // expect(flat(arr)).toEqual([1, 2, [3, [4]], 5]);
  // expect(flat(arr, 1)).toEqual([1, 2, [3, [4]], 5]);
  // expect(flat(arr, 2)).toEqual([1, 2, 3, [4], 5]);
  expect(flat(arr, Infinity)).toEqual([1, 2, 3, 4, 5]);
});
