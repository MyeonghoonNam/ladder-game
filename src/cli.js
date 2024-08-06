const readline = require("readline");
const { INPUT_VALIDATION_ERRORS } = require("./constants/validate");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function cli() {
  const playerCount = Number(await askQuestion("? How many player: "));
  const playerNames = [];
  const destination = [];

  if (playerCount <= 0 || Number.isNaN(playerCount)) {
    rl.close();
    throw new Error(INPUT_VALIDATION_ERRORS.INPUT_VALIDATION_ERRORS);
  }

  for (let i = 0; i < playerCount; i++) {
    const answer = await askQuestion(`? Enter a name for player ${i + 1}: `);
    playerNames.push(answer);
  }

  for (let i = 0; i < playerCount; i++) {
    const answer = await askQuestion(`? Enter a destination for ${i + 1}: `);
    destination.push(answer);
  }

  rl.close();

  return { playerCount, playerNames, destination };
}

module.exports = cli;
