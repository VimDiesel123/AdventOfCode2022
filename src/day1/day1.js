const fs = require('fs');
const path = require('path');

function elfTotals(inputString)
{
    var elves = inputString.replaceAll('\r', "").split("\n\n");
    var elves = elves.map(elf => elf.split('\n'));
    return elves.map(elf => elf.reduce((acc, cur) => acc + parseInt(cur), 0));
}

function getTextInput(fileName)
{
    return fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8');
}

function mostCalories(inputFile)
{
    let input = getTextInput(inputFile);
    let totals = elfTotals(input);
    return Math.max(...totals);
}

function topThreeCalories(inputFile)
{
    var input = getTextInput(inputFile)
    var totals = elfTotals(input);
    var topThree =  totals.sort( (a,b) => b - a).slice(0,3).reduce((acc,cur) => acc + parseInt(cur), 0);
    return topThree;
}

console.log('Most calories: ' + mostCalories('real_input.txt'));
console.log('Top 3 calories: ' + topThreeCalories('real_input.txt'));

exports.mostCalories = mostCalories;
exports.topThreeCalories = topThreeCalories;