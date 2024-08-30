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

  if (playerCount < 2 || playerCount > 10 || Number.isNaN(playerCount)) {
    rl.close();
    throw new Error(`${ANSI.FgRed}${INPUT_VALIDATION_ERRORS.INVALID_PLAYER_COUNT}${ANSI.Reset}`);
  }

  for (let i = 0; i < playerCount; i++) {
    const answer = await askQuestion(
      `${ANSI.FgGreen}? ${ANSI.FgBrightWhite}Enter a name for player ${i + 1}${ANSI.Reset} (String length from 1 to 10 characters) >> `
    );

    if (answer.length < 1 || answer.length > 10) {
      rl.close();
      throw new Error(`${ANSI.FgRed}${INPUT_VALIDATION_ERRORS.INVALID_POINT_VALUE}${ANSI.Reset}`);
    }

    playerNames.push(answer);
  }

  for (let i = 0; i < playerCount; i++) {
    const answer = await askQuestion(
      `${ANSI.FgGreen}? ${ANSI.FgBrightWhite}Enter a destination for ${i + 1}${ANSI.Reset} (String length from 1 to 10 characters) >> `
    );

    if (answer.length < 1 || answer.length > 10) {
      rl.close();
      throw new Error(`${ANSI.FgRed}${INPUT_VALIDATION_ERRORS.INVALID_POINT_VALUE}${ANSI.Reset}`);
    }

    destination.push(answer);
  }

  rl.close();

  return { playerCount, playerNames, destination };
}
