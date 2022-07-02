const deepClone = require('../src/deep-clone');

test('test deepClone', () => {
  const data = { a: 1, time: new Date(), b: { c: [1, 2, { d: { c: 1 } }] } };
  const cloneData = deepClone(data);
  expect(cloneData).toEqual(data);
});
