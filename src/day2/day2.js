const fs = require('fs');
const path = require('path');

const shapeValues = {
  X: 1,
  Y: 2,
  Z: 3,
};

const shapeBeats = {
  X: 'Z',
  Y: 'X',
  Z: 'Y',
};

const shapeLosesTo = {
  X: 'Y',
  Y: 'Z',
  Z: 'X',
};

const decryptTheirChoice = {
  A: 'X',
  B: 'Y',
  C: 'Z',
};

const winLoseDrawToPoints = {
  X: 0,
  Y: 3,
  Z: 6,
};

function roundScoreShapes(theirChoice, ourChoice) {
  let winScore = 0;
  if (theirChoice === ourChoice) {
    winScore = 3;
  } else if (shapeBeats[ourChoice] === theirChoice) {
    winScore = 6;
  } else {
    winScore = 0;
  }
  return shapeValues[ourChoice] + winScore;
}

function totalScoreShape(inputFile) {
  const rounds = fs.readFileSync(path.resolve(__dirname, inputFile))
    .toString()
    .replaceAll('\r', '')
    .split('\n');
  const roundChoices = rounds.map((round) => round.split(' '));
  const total = roundChoices
    .map((round) => {
      const theirChoice = decryptTheirChoice[round[0]];
      const ourChoice = round[1];
      return roundScoreShapes(theirChoice, ourChoice);
    })
    .reduce((acc, current) => acc + current, 0);
  return total;
}

function getOurChoice(opponentChoice, winLoseDraw) {
  if (winLoseDraw === 'Y') {
    return opponentChoice;
  }
  if (winLoseDraw === 'X') {
    return shapeBeats[opponentChoice];
  }
  if (winLoseDraw === 'Z') {
    return shapeLosesTo[opponentChoice];
  }
  throw new Error('The win lose draw outcome needs to be X, Y or Z');
}

function roundScoreWinLoseDraw(opponentChoice, winLoseDraw) {
  const choice = getOurChoice(decryptTheirChoice[opponentChoice], winLoseDraw);
  return shapeValues[choice] + winLoseDrawToPoints[winLoseDraw];
}

function totalScoreWinLoseDraw(inputFile) {
  const rounds = fs.readFileSync(path.resolve(__dirname, inputFile))
    .toString()
    .replaceAll('\r', '')
    .split('\n');
  const roundDecisions = rounds.map((round) => round.split(' '));
  const total = roundDecisions
    .map((round) => roundScoreWinLoseDraw(round[0], round[1]))
    .reduce((acc, current) => acc + current, 0);
  return total;
}

console.log('Total score: ', totalScoreShape('./real_input.txt'));
console.log('Total score win/lose/draw', totalScoreWinLoseDraw('./real_input.txt'));

module.exports = {
  totalScoreShape,
  roundScoreShapes,
  totalScoreWinLoseDraw,
  roundScoreWinLoseDraw,
};
