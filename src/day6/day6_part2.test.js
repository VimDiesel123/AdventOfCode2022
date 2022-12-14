const { startOfMessage } = require('./day6_part2');

test('Start of message for the test input should be 19', () => {
  expect(startOfMessage('./test_input.txt')).toBe(19);
});
