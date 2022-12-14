const fs = require('fs');
const path = require('path');

function hasDuplicates(sequence) {
  const uniqueVals = new Set(sequence);
  return uniqueVals.size !== sequence.length;
}

function getDataStream(inputFile) {
  return fs.readFileSync(path.resolve(__dirname, inputFile), 'utf-8')
    .replaceAll('\r', '');
}

function startOfPacket(inputFile) {
  const datastream = getDataStream(inputFile);
  let startIndex = 0;
  let endIndex = 4;
  const sequence = [...datastream.substring(startIndex, endIndex)];
  if (!hasDuplicates(sequence)) { return endIndex; }

  for (; endIndex < datastream.length; startIndex += 1, endIndex += 1) {
    if (!hasDuplicates(sequence)) { return endIndex; }
    sequence.push(datastream.charAt(endIndex));
    sequence.shift();
  }

  return endIndex;
}

console.log('The start of the packet for the datastream is: ', startOfPacket('./real_input.txt'));

module.exports = { startOfPacket, hasDuplicates, getDataStream };
