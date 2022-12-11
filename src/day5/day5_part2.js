const {
  crateMessage, testStacks, testInstructionsString, realStacks, realInstructionsString,
} = require('./day5_part1');

function moveCratesMultipleAtATime(stacks, instruction) {
  const { amount, origin, target } = instruction;
  // eslint-disable-next-line no-param-reassign
  stacks[target - 1] = stacks[target - 1].concat(stacks[origin - 1].splice(-amount));
}

console.log(
  'Crate Message when moving multiple at once: ',
  crateMessage(realStacks, realInstructionsString, moveCratesMultipleAtATime),
);

module.exports = {
  crateMessage,
  moveCratesMultipleAtATime,
  testStacks,
  testInstructionsString,
};
