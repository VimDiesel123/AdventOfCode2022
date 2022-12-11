const {
  crateMessage, moveCratesMultipleAtATime, testStacks, testInstructionsString,
} = require('./day5_part2');

test('Crate message for test input should be MCD', () => {
  expect(crateMessage(testStacks, testInstructionsString, moveCratesMultipleAtATime)).toBe('MCD');
});
