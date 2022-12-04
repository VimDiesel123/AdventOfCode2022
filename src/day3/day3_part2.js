const { getRucksacks, itemPriority } = require('./day3_part1');

function splitIntoElfGroups(rucksacks) {
  const groupSize = 3;
  const result = [];
  while (rucksacks.length > 0) {
    result.push(rucksacks.splice(0, groupSize));
  }
  return result;
}

function getBadgeItem(group) {
  return [...group[0]].filter((item) => group[1].includes(item) && group[2].includes(item)).at(0);
}

function totalBadgePriorites(inputFile) {
  const rucksacks = getRucksacks(inputFile);
  const elfGroups = splitIntoElfGroups(rucksacks);
  const groupBadgeTotals = elfGroups
    .map((group) => getBadgeItem(group))
    .map((item) => itemPriority(item))
    .reduce((total, currentItem) => total + currentItem, 0);
  return groupBadgeTotals;
}

console.log('Group badge totals: ', totalBadgePriorites('./real_input.txt'));

module.exports = { totalBadgePriorites, splitIntoElfGroups, getBadgeItem };
