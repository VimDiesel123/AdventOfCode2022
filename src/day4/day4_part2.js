const { getLines, getPair } = require('./day4_part1');

function overlapAtAll(pair1, pair2) {
  return (pair1[0] >= pair2[0] && pair1[0] <= pair2[1])
         || (pair1[1] >= pair2[0] && pair1[1] <= pair2[1])
         || (pair2[0] >= pair1[0] && pair2[0] <= pair1[1])
         || (pair2[1] >= pair1[0] && pair2[1] <= pair1[1]);
}

function allOverlappingPairs(inputFile) {
  const lines = getLines(inputFile);
  const pairs = lines.map((line) => getPair(line));
  return pairs
    .reduce((total, currentPair) => total + overlapAtAll(currentPair[0], currentPair[1]), 0);
}

console.log('Total pairs that overlap at all: ', allOverlappingPairs('./real_input.txt'));

module.exports = { allOverlappingPairs, overlapAtAll };
