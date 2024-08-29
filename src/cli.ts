import readline from 'readline';
import { INPUT_VALIDATION_ERRORS } from './constants/validate.js';
import { ANSI } from './constants/ansi.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

export default async function Cli() {
  const playerCount = Number(
    await askQuestion(`${ANSI.FgGreen}? ${ANSI.FgBrightWhite}How many player?${ANSI.Reset} (From 2 to 10) >> `)
  );

  const playerNames = [];
  const destination = [];

  if (playerCount <= 0 || Number.isNaN(playerCount)) {
    rl.close();
    throw new Error(INPUT_VALIDATION_ERRORS.INVALID_PLAYER_COUNT);
  }

  for (let i = 0; i < playerCount; i++) {
    const answer = await askQuestion(
      `${ANSI.FgGreen}? ${ANSI.FgBrightWhite}Enter a name for player ${i + 1}${ANSI.Reset} (String length from 1 to 10 characters) >> `
    );

    playerNames.push(answer);
  }

  for (let i = 0; i < playerCount; i++) {
    const answer = await askQuestion(
      `${ANSI.FgGreen}? ${ANSI.FgBrightWhite}Enter a destination for ${i + 1}${ANSI.Reset} (String length from 1 to 10 characters) >> `
    );

    destination.push(answer);
  }

  rl.close();

  return { playerCount, playerNames, destination };
}
