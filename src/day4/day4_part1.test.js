const { totallyOverlappingPairs, getPair, pairsTotallyOverlap } = require('./day4_part1');

test('Overlapping pairs should be 2 for the test input', () => {
  expect(totallyOverlappingPairs('./test_input.txt')).toBe(2);
});

const lines = [
  ['2-4,6-8', [[2, 4], [6, 8]]],
  ['2-3,4-5', [[2, 3], [4, 5]]],
  ['5-7,7-9', [[5, 7], [7, 9]]],
];

test.each(lines)('When line is: %p, pairs should be: %p', (line, knownPairs) => {
  const pairs = getPair(line);
  expect(pairs).toEqual(knownPairs);
});

const pairs = [
  [[2, 8], [3, 6], true],
  [[6, 6], [4, 6], true],
  [[5, 7], [7, 9], false],
];

test.each(pairs)('With pairs: %p and %p, one pair fully contains another?: %p', (pair1, pair2, overlap) => {
  const result = pairsTotallyOverlap(pair1, pair2);
  expect(result).toBe(overlap);
});
