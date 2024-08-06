const intro = require("./intro");
const cli = require("./cli");
const game = require("./game");

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
