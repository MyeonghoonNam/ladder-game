#!/usr/bin/env node
const intro = require('./src/intro');
const cli = require('./src/cli');
const game = require('./src/game');

async function main() {
  try {
    intro();
    const answers = await cli();
    game(answers);
  } catch (e) {
    console.log(e);
  }
}

main();
