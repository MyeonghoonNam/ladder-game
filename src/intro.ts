import figlet from 'figlet';
import { ANSI } from './constants/ansi.js';

/**
 * Intro function to output 3D text
 */
export default function Intro() {
  const INTRO_TEXT = 'LADDER  GAME';
  console.log(`${ANSI.FgGreen}${figlet.textSync(INTRO_TEXT)}${ANSI.Reset}`);
}
