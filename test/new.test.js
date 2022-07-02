const myNew = require('../src/new');

function Person(name) {
  this.name = name;
  this.age = 18;
}

const person1 = new Person('Jason');
const person2 = myNew(Person, 'Nick');

test('test new', () => {
  expect(person1).toEqual({ name: 'Jason', age: 18 });
  expect(person2).toEqual({ name: 'Nick', age: 18 });
});
