const {
  crateMessage, getInstructions, testStacks, testInstructionsString, moveCratesOneByOne,
} = require('./day5_part1');

test('The crate message for the test input should be CMZ', () => {
  expect(crateMessage(testStacks, testInstructionsString, moveCratesOneByOne)).toBe('CMZ');
});

const knownInstructions = {
  input:
`move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
  instructions:
  [
    { amount: 1, origin: 2, target: 1 },
    { amount: 3, origin: 1, target: 3 },
    { amount: 2, origin: 2, target: 1 },
    { amount: 1, origin: 1, target: 2 },
  ],
};

test('Test input should return the correct instructions', () => {
  expect(getInstructions(knownInstructions.input)).toEqual(knownInstructions.instructions);
});
