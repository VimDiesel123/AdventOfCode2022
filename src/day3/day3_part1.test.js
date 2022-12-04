const {
  misplacedItemPriorities, divideRucksack, getMisplacedItem, itemPriority,
} = require('./day3_part1');

test('Sum of misplaced item priorities should be 157.', () => {
  expect(misplacedItemPriorities('./test_input.txt')).toBe(157);
});

const knownRucksacks = [['vJrwpWtwJgWrhcsFMMfFFhFp', ['vJrwpWtwJgWr', 'hcsFMMfFFhFp']],
  ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', ['jqHRNqRjqzjGDLGL', 'rsFMfFZSrLrFZsSL']],
  ['PmmdzqPrVvPwwTWBwg', ['PmmdzqPrV', 'vPwwTWBwg']]];

test.each(knownRucksacks)(
  'The rucksack: %p should split int compartments: %p',
  (rucksack, knownCompartments) => {
    const result = divideRucksack(rucksack);
    expect(result).toEqual(knownCompartments);
  },
);

const knownMisplacedItems = [[['vJrwpWtwJgWr', 'hcsFMMfFFhFp'], 'p']];

test.each(knownMisplacedItems)(
  'The rucksack with these compartments: %p should have misplaced item: %p',
  (compartments, knownMisplacedItem) => {
    const result = getMisplacedItem(compartments[0], compartments[1]);
    console.log(result);
    expect(result).toEqual(knownMisplacedItem);
  },
);

const knownPriorities = [['a', 1], ['z', 26], ['A', 27], ['Z', 52]];

test.each(knownPriorities)('The item: %p should have the priority: %p', (item, knownPriority) => {
  const priority = itemPriority(item);
  expect(priority).toEqual(knownPriority);
});
