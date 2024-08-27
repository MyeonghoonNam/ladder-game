#!/usr/bin/env node
import Intro from './intro.js';
import Cli from './cli.js';
import Game from './game.js';

async function main() {
  try {
    Intro();
    const answers = await Cli();
    Game(answers);
  } catch (e) {
    console.log(e);
  }
}

main();
