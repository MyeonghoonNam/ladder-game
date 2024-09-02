import { ANSI } from './constants/ansi.js';

interface GameProps {
  playerCount: number;
  playerNames: string[];
  destination: string[];
}

interface Result {
  name: string;
  goal: string;
}
/**
 * Ladder Game progress function
 * @param playerCount Total number of players
 * @param playerNames Set of player names
 * @param destination Set of destination names
 */
export default function Game({ playerCount, playerNames, destination }: GameProps) {
  const N = 5; // ladder height
  const M = 2 * playerCount - 1; // ladder width
  const footStools = ['---', '\\-\\', '/-/'];

  let board: string[][] = [];
  let ladderGraph: number[][] = [];
  let visited: number[][] = [];

  const dy1 = [0, 0, 1];
  const dx1 = [-1, 1, 0];

  const dy2 = [-1, -1, 1, 1];
  const dx2 = [-1, 1, 1, -1];

  /**
   * ladder structure initialization function without footStool
   */
  function reset() {
    board = Array.from(new Array(N), () => new Array(M));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        board[i][j] = j % 2 === 0 ? '|' : ' ';
      }
    }
  }

  /**
   * function for getting the total number of random footStool
   * @returns total number of random footStool
   */
  function randomFootStoolCount() {
    return Math.floor(Math.random() * (Math.floor(M / 2) * N)) + 1;
  }

  /**
   * function for getting only one footStool of footStools
   * @returns one random footStool
   */
  function randomFootStool() {
    return footStools[Math.floor(Math.random() * footStools.length)];
  }

  /**
   * function to fill an empty ladder with random footStools
   */
  function randomFill() {
    let totalFootStoolCount = randomFootStoolCount();
    let count = 0;

    while (totalFootStoolCount !== count) {
      const x = Math.floor(Math.random() * M);
      const y = Math.floor(Math.random() * N);

      if (board[y][x] === ' ') {
        board[y][x] = randomFootStool();
        count += 1;
      }
    }
  }

  /**
   * funtion to validate correct ladder structure
   * @returns validate the correct ladder structure
   */
  function analyze() {
    for (let i = 0; i < N; i++) {
      for (let j = 1; j < M - 1; j++) {
        if (board[i][j - 1] === footStools[0] && board[i][j + 1] === footStools[0]) {
          return false;
        }

        if (board[i][j - 1] === footStools[1] && board[i][j + 1] === footStools[2]) {
          return false;
        }

        if (board[i][j - 1] === footStools[2] && board[i][j + 1] === footStools[1]) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * data structure setup function for ladder move
   */
  function setLadderGraph() {
    ladderGraph = Array.from(new Array(N * 3), () => new Array(M * 2 - 1).fill(0));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const ladder = board[i][j];

        switch (ladder) {
          case '|': {
            ladderGraph[i * 3][j * 2] = 1;
            ladderGraph[i * 3 + 1][j * 2] = 1;
            ladderGraph[i * 3 + 2][j * 2] = 1;

            break;
          }

          case '---': {
            ladderGraph[i * 3 + 1][j * 2 - 1] = 1;
            ladderGraph[i * 3 + 1][j * 2] = 1;
            ladderGraph[i * 3 + 1][j * 2 + 1] = 1;

            break;
          }

          case '\\-\\': {
            ladderGraph[i * 3][j * 2 - 1] = 1;
            ladderGraph[i * 3 + 1][j * 2] = 1;
            ladderGraph[i * 3 + 2][j * 2 + 1] = 1;

            break;
          }

          case '/-/': {
            ladderGraph[i * 3][j * 2 + 1] = 1;
            ladderGraph[i * 3 + 1][j * 2] = 1;
            ladderGraph[i * 3 + 2][j * 2 - 1] = 1;

            break;
          }
        }
      }
    }

    const startAndEndLine = new Array(M * 2 - 1).fill(0).map((_, i) => (i % 4 === 0 ? 1 : 0));

    ladderGraph.unshift(startAndEndLine);
    ladderGraph.push(startAndEndLine);
  }

  /**
   * validate graph coordinates function
   * @param y coordinate
   * @param x coordinate
   * @returns verification result
   */
  function isValidGraphRange(y: number, x: number) {
    if (y < 0 || x < 0 || y >= ladderGraph.length || x >= ladderGraph[0].length) return false;
    return true;
  }

  /**
   * ladder move function
   * @param y coordinate
   * @param x coordinate
   * @param d previous direction
   * @returns destination x coordinate
   */
  function move(y: number, x: number, d = ''): number {
    let ret = -1;

    visited[y][x] = 1;

    if (y === ladderGraph.length - 1) {
      return x;
    }

    // handling left, right, down directions
    for (let i = 0; i < dy1.length; i++) {
      const ny = y + dy1[i];
      const nx = x + dx1[i];

      if (!isValidGraphRange(ny, nx)) continue;

      if (ladderGraph[ny][nx] === 1 && !visited[ny][nx]) {
        if ((d === 'L' || d === 'R') && nx % 4 !== 0 && ny !== y) continue;

        const dir = nx < x ? 'L' : nx > x ? 'R' : 'D';

        visited[ny][nx] = 1;
        ret = move(ny, nx, dir);

        if (ret !== -1) return ret;
      }
    }

    // handling diagonal directions
    for (let i = 0; i < dy2.length; i++) {
      const ny = y + dy2[i];
      const nx = x + dx2[i];

      if (!isValidGraphRange(ny, nx)) continue;

      if (ladderGraph[ny][nx] === 1 && !visited[ny][nx]) {
        if (d === 'L' && nx > x) continue;
        if (d === 'R' && nx < x) continue;

        const dir = nx < x ? 'L' : nx > x ? 'R' : 'D';

        visited[ny][nx] = 1;
        ret = move(ny, nx, dir);
      }
    }

    return ret;
  }

  /**
   * game result print function
   */
  function display() {
    setLadderGraph();

    const result: Result[] = [];

    const ladder = board.map((row) => row.map((v) => (v === ' '.repeat(1) ? ' '.repeat(3) : v)).join('')).join('\n');
    const start: number[] = new Array(ladderGraph[0].length).fill(0);
    const end: number[] = new Array(ladderGraph[0].length).fill(0);

    for (let i = 0; i < ladderGraph[0].length; i++) {
      const player = Math.floor(i / 3) + 1;

      // player start x coordinates
      if (i % 4 === 0) {
        visited = Array.from(new Array(ladderGraph.length), () => new Array(ladderGraph[0].length).fill(0));

        const pos = move(0, i);

        start[i] = player;
        end[pos] = player;

        result[Math.floor(i / 4) + 1] = {
          name: playerNames[Math.floor(i / 4)],
          goal: destination[Math.floor(pos / 4)],
        };
      }
    }

    const startResult = start.map((v, i) => (i % 4 === 0 ? v : ' ')).join('');
    const endResult = end.map((v, i) => (i % 4 === 0 ? v : ' ')).join('');

    console.log(startResult);
    console.log(ladder);
    console.log(endResult);

    for (let key of Object.keys(result)) {
      const { name, goal } = result[Number(key)];
      console.log(`${ANSI.FgGreen}player ${key}(=${name})${ANSI.Reset} arrived at ${ANSI.FgGreen}${goal}${ANSI.Reset}`);
    }
  }

  reset();
  randomFill();

  while (!analyze()) {
    reset();
    randomFill();
  }

  display();
}
