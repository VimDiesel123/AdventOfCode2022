const { totalBadgePriorites, getBadgeItem } = require('./day3_part2');

test('The total badge item priorities for test input should be 70', () => {
  expect(totalBadgePriorites('./test_input.txt')).toBe(70);
});

const badgeItems = [
  [
    ['vJrwpWtwJgWrhcsFMMfFFhFp',
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
      'PmmdzqPrVvPwwTWBwg'],
    'r'],
];

test.each(badgeItems)('When the group is: %p the badge item should be: %p', (group, knownBadgeItem) => {
  const item = getBadgeItem(group);
  expect(item).toEqual(knownBadgeItem);
});
