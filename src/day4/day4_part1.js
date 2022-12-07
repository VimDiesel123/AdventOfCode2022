const fs = require('fs');
const path = require('path');

function getPair(line) {
  const pairsRegex = /(\d+)-(\d+)/g;
  const pairs = [...line.matchAll(pairsRegex)];
  const numericPairs = pairs.map((pair) => [parseInt(pair[1], 10), parseInt(pair[2], 10)]);
  return numericPairs;
}

function pairsTotallyOverlap(pair1, pair2) {
  return (pair1[0] >= pair2[0] && pair1[1] <= pair2[1])
         || (pair2[0] >= pair1[0] && pair2[1] <= pair1[1]);
}

function getLines(inputFile) {
  return fs.readFileSync(path.resolve(__dirname, inputFile), 'utf-8')
    .replaceAll('\r', '')
    .split('\n');
}

function totallyOverlappingPairs(inputFile) {
  const lines = getLines(inputFile);
  const overlapping = lines
    .map((line) => getPair(line))
    .reduce((total, currentPair) => total + pairsTotallyOverlap(currentPair[0], currentPair[1]), 0);
  return overlapping;
}

console.log('Total number of overlapping pairs: ', totallyOverlappingPairs('./real_input.txt'));

module.exports = {
  totallyOverlappingPairs, getPair, pairsTotallyOverlap, getLines,
};
