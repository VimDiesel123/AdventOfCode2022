const fs = require('fs');
const path = require('path');

function isUpperCase(c) {
  return c === c.toUpperCase();
}

function itemPriority(item) {
  if (isUpperCase(item)) {
    return item.charCodeAt(0) - 38;
  }

  return item.charCodeAt(0) - 96;
}

function divideRucksack(rucksack) {
  return [rucksack.substring(0, rucksack.length / 2),
    rucksack.substring(rucksack.length / 2, rucksack.length)];
}

function getMisplacedItem(compartmentOne, compartmentTwo) {
  return [...compartmentOne].filter((item) => compartmentTwo.includes(item)).at(0);
}

function getRucksacks(inputFile) {
  return fs.readFileSync(path.resolve(__dirname, inputFile), 'utf-8')
    .replaceAll('\r', '')
    .split('\n');
}

function misplacedItemPriorities(inputFile) {
  const rucksacks = getRucksacks(inputFile);
  const sumOfMisplacedItemPriorities = rucksacks
    .map(divideRucksack)
    .map((dividedRucksack) => getMisplacedItem(...dividedRucksack))
    .map((item) => itemPriority(item))
    .reduce((total, currentItem) => total + currentItem, 0);
  return sumOfMisplacedItemPriorities;
}

console.log('Total value of misplaced items: ', misplacedItemPriorities('./real_input.txt'));

module.exports = {
  misplacedItemPriorities,
  divideRucksack,
  getMisplacedItem,
  itemPriority,
  getRucksacks,
};
