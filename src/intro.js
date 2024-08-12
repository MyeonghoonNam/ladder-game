const figlet = require("figlet");
const { ANSI } = require("./constants/ansi");

function intro() {
  const INTRO_TEXT = "LADDER  GAME";
  console.log(`${ANSI.FgGreen}${figlet.textSync(INTRO_TEXT)}${ANSI.Reset}`);
}

module.exports = intro;
