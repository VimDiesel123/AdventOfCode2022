const fs = require('fs');
const path = require('path');

function elfTotals(inputString) {
  const input = inputString.replaceAll('\r', '').split('\n\n');
  const elves = input.map((elf) => elf.split('\n'));
  return elves.map((elf) => elf.reduce((acc, cur) => acc + parseInt(cur, 10), 0));
}

function getTextInput(fileName) {
  return fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8');
}

function mostCalories(inputFile) {
  const input = getTextInput(inputFile);
  const totals = elfTotals(input);
  return Math.max(...totals);
}

function topThreeCalories(inputFile) {
  const input = getTextInput(inputFile);
  const totals = elfTotals(input);
  const topThree = totals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => acc + parseInt(cur, 10), 0);
  return topThree;
}

console.log(`Most calories: ${mostCalories('real_input.txt')}`);
console.log(`Top 3 calories: ${topThreeCalories('real_input.txt')}`);

exports.mostCalories = mostCalories;
exports.topThreeCalories = topThreeCalories;
