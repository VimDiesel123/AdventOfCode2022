const fs = require('fs');
const path = require('path');

const testStacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
const testInstructionsString = `move 1 from 2 to 1
                                move 3 from 1 to 3
                                move 2 from 2 to 1
                                move 1 from 1 to 2`;

const realStacks = [
  ['F', 'D', 'B', 'Z', 'T', 'J', 'R', 'N'],
  ['R', 'S', 'N', 'J', 'H'],
  ['C', 'R', 'N', 'J', 'G', 'Z', 'F', 'Q'],
  ['F', 'V', 'N', 'G', 'R', 'T', 'Q'],
  ['L', 'T', 'Q', 'F'],
  ['Q', 'C', 'W', 'Z', 'B', 'R', 'G', 'N'],
  ['F', 'C', 'L', 'S', 'N', 'H', 'M'],
  ['D', 'N', 'Q', 'M', 'T', 'J'],
  ['P', 'G', 'S'],
];
const realInstructionsString = fs.readFileSync(path.resolve(__dirname, './real_input.txt'), 'utf-8')
  .replaceAll('\r', '').split('\n\n')[1];

function getInstructions(instructionString) {
  const regex = /(\d+)/g;
  const instructions = instructionString.split('\n').map((line) => {
    const digits = line.match(regex);
    return {
      amount: parseInt(digits[0], 10),
      origin: parseInt(digits[1], 10),
      target: parseInt(digits[2], 10),
    };
  });
  return instructions;
}

function crateMessage(stacks, instructionString, moveMethod) {
  const stacksCopy = structuredClone(stacks);
  const instructions = getInstructions(instructionString);
  instructions.forEach((instruction) => moveMethod(stacksCopy, instruction));
  return stacksCopy.reduce((message, currentStack) => message + currentStack.pop().toString(), '');
}

function moveCratesOneByOne(stacks, instruction) {
  const { amount, origin, target } = instruction;
  for (let i = 0; i < amount; i += 1) {
    stacks[target - 1].push(stacks[origin - 1].pop());
  }
}

console.log('Crate Message: ', crateMessage(realStacks, realInstructionsString, moveCratesOneByOne));

module.exports = {
  crateMessage,
  getInstructions,
  testStacks,
  testInstructionsString,
  moveCratesOneByOne,
  realStacks,
  realInstructionsString,
};
