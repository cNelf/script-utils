const { removeRepeatV1, removeRepeatV2 } = require('../src/remove-repeat');

describe('test remove repeat array element', () => {
  test('test removeRepeatV1', () => {
    const arr = removeRepeatV1([2, 3, 2, 5, 3, 4, 4]);
    expect(arr).toEqual([2, 3, 5, 4]);
  });

  test('test removeRepeatV2', () => {
    const arr = removeRepeatV2([2, 3, 2, 5, 3, 4, 4]);
    expect(arr).toEqual([2, 3, 5, 4]);
  });
});
