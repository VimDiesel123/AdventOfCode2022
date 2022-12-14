const { getDataStream, hasDuplicates } = require('./day6_part1');

function startOfMessage(inputFile) {
  const datastream = getDataStream(inputFile);
  let startIndex = 0;
  let endIndex = 14;
  const sequence = [...datastream.substring(startIndex, endIndex)];
  if (!hasDuplicates(sequence)) { return endIndex; }

  for (; endIndex < datastream.length; startIndex += 1, endIndex += 1) {
    if (!hasDuplicates(sequence)) { return endIndex; }
    sequence.push(datastream.charAt(endIndex));
    sequence.shift();
  }

  return endIndex;
}

console.log('Start of message at: ', startOfMessage('./real_input.txt'));

module.exports = { startOfMessage };
