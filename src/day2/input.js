const fs = require('fs');
const path = require('path');

const testInput = () => {
  fs.readFileSync(path.resolve(__dirname, './test_input.txt'))
    .toString()
    .replaceAll('\r', '')
    .split('\n');
};

const realInput = () => {
  fs.readFileSync(path.resolve(__dirname, './real_input.txt'))
    .toString()
    .replaceAll('\r', '')
    .split('\n');
};

module.exports = { testInput, realInput };
