const formatTime = require('../src/format-time');

test('test formatTime', () => {
  expect(formatTime('2022/02/10', 'YYYY-MM-DD')).toBe('2022-02-10');
  expect(formatTime(1644422400000, 'YYYY-MM-DD')).toBe('2022-02-10');
  expect(formatTime(1644422400000, 'YYYY-MM-DD HH:mm:ss')).toBe('2022-02-10 00:00:00');
  expect(formatTime(new Date('2022/02/10'), 'YYYY-MM-DD')).toBe('2022-02-10');
})
