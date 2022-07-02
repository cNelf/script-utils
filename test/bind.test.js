const bind = require('../src/bind');

const obj = {
  a: 1,
};

function func() {
  return this.a;
}

test('test new', () => {
  expect(func.bind(obj)()).toBe(1);
  expect(bind(func, obj)()).toBe(1);
});
