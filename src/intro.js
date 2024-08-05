const figlet = require("figlet");

function intro() {
  const INTRO_TEXT = "LADDER  GAME";
  console.log(figlet.textSync(INTRO_TEXT));
}

module.exports = intro;
