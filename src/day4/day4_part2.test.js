const { allOverlappingPairs, overlapAtAll } = require('./day4_part2');

test('All overlapping pairs for test data is 4', () => {
  expect(allOverlappingPairs('./test_input.txt')).toBe(4);
});

const pairs = [
  [[5, 7], [7, 9], true],
  [[2, 8], [3, 7], true],
  [[6, 6], [4, 6], true],
  [[2, 6], [4, 8], true],
  [[2, 4], [6, 8], false],
];

test.each(pairs)('Pairs: %p and %p overlap at all?: %p', (pair1, pair2, overlap) => {
  const result = overlapAtAll(pair1, pair2, overlap);
  expect(result).toEqual(overlap);
});
