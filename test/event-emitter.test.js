const EventEmitter = require('../src/event-emitter');

const emitter = new EventEmitter();

emitter.on('addCount', (count) => {
  count.num++;
});

test('test eventEmitter', () => {
  let count = { num: 0 };
  emitter.trigger('event', count);
  expect(count).toEqual({ num: 1 });
});
