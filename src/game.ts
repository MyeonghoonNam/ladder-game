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

export default function Game({ playerCount, playerNames, destination }: GameProps) {
  const N = 5; // 사다리 높이
  const M = 2 * playerCount - 1; // 사다리 넓이
  const footStools = ['---', '\\-\\', '/-/'];

  let board: string[][] = [];
  let ladderGraph: number[][] = [];
  let visited: number[][] = [];

  const dy1 = [0, 0, 1];
  const dx1 = [-1, 1, 0];

  const dy2 = [-1, -1, 1, 1];
  const dx2 = [-1, 1, 1, -1];

  function reset() {
    board = Array.from(new Array(N), () => new Array(M));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        board[i][j] = j % 2 === 0 ? '|' : ' ';
      }
    }
  }

  function randomFootStoolCount() {
    return Math.floor(Math.random() * (Math.floor(M / 2) * N)) + 1;
  }

  function randomFootStool() {
    return footStools[Math.floor(Math.random() * footStools.length)];
  }

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

  function isValidGraphRange(y: number, x: number) {
    if (y < 0 || x < 0 || y >= ladderGraph.length || x >= ladderGraph[0].length) return false;

    return true;
  }

  function move(y: number, x: number, d = ''): number {
    let ret = -1;

    visited[y][x] = 1;

    if (y === ladderGraph.length - 1) {
      return x;
    }

    // 좌, 우, 하 사다리 이동 예외 처리
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

    // 대각 4방향 사다리 이동 예외처리
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

  function display() {
    setLadderGraph();

    const result: Result[] = [];

    const ladder = board.map((row) => row.map((v) => (v === ' '.repeat(1) ? ' '.repeat(3) : v)).join('')).join('\n');
    const start: number[] = new Array(ladderGraph[0].length).fill(0);
    const end: number[] = new Array(ladderGraph[0].length).fill(0);

    for (let i = 0; i < ladderGraph[0].length; i++) {
      const player = Math.floor(i / 3) + 1;

      // 플레이어 시작 사다리 "|"
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
