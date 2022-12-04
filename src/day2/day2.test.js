const { totalScoreShape } = require('./day2');

test('Total score for test input should be 15', () => {
  expect(totalScoreShape('./test_input.txt')).toBe(15);
});
