const myInstanceof = require('../src/instanceof');

class Person {}

test('test instanceof', () => {
  const num = new Number(1);
  expect(myInstanceof(1, Number)).toBeFalsy();
  expect(myInstanceof(num, Number)).toBeTruthy();
  expect(myInstanceof(num, Object)).toBeTruthy();

  const person = new Person();
  expect(myInstanceof(person, Person)).toBeTruthy();
  expect(myInstanceof(person, Object)).toBeTruthy();

  expect(myInstanceof([], Array)).toBeTruthy();
  expect(myInstanceof({}, Object)).toBeTruthy();
})
