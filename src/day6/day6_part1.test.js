const { startOfPacket, hasDuplicates } = require('./day6_part1');

test('The start of the packet for the test input should be 7', () => {
  expect(startOfPacket('./test_input.txt')).toBe(7);
});

const sequences = [[['a', 'b', 'b', 'c'], true], [['a', 'b', 'c', 'd'], false]];

test.each(sequences)('The sequence: %p has duplicates?: %p', (sequence, duplicates) => {
  expect(hasDuplicates(sequence)).toBe(duplicates);
});
