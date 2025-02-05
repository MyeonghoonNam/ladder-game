import { LADDER_FOOT_STOOLS } from 'constants/ladder';
import { type Ladder, type LadderGameResult } from 'models';

interface State {
  ladder: Ladder;
  result: LadderGameResult[];
}

type Action =
  | { type: 'init_game'; width: number; height: number }
  | { type: 'start_game'; width: number; height: number; players: string[]; goals: string[] };

export const initialState: State = {
  ladder: [],
  result: [],
};

const dy1 = [0, 0, 1];
const dx1 = [-1, 1, 0];
const dy2 = [-1, -1, 1, 1];
const dx2 = [-1, 1, 1, -1];

export function gameReducer(state: State, action: Action) {
  let ladderGraph: number[][] = [[]];
  let visited: number[][] = [[]];

  /**
   * ladder structure initialization function without footStool
   * @param width ladder width
   * @param height ladder height
   */
  const reset = (width: number, height: number) => {
    state.ladder = Array.from(new Array(height), () =>
      new Array(width).fill('').map((v, i) => (i % 2 === 0 ? '|' : v))
    );

    state.result = [];
  };

  /**
   * function for getting the total number of random footStool
   * @param width ladder width
   * @param height ladder height
   * @returns total number of random footStool
   */
  const randomFootStoolCount = (width: number, height: number) => {
    return Math.floor(Math.random() * (width * height)) + 1;
  };

  /**
   * function for getting only one footStool of LADDER_FOOT_STOOLS
   * @returns one random footStool
   */
  const randomFootStool = () => {
    return LADDER_FOOT_STOOLS[Math.floor(Math.random() * LADDER_FOOT_STOOLS.length)];
  };

  /**
   * function to fill an empty ladder with random LADDER_FOOT_STOOLS
   * @param width ladder width
   * @param height ladder height
   */
  const randomFill = (width: number, height: number) => {
    const totalFootStoolCount = randomFootStoolCount(width % 2, height);
    let count = 0;

    while (totalFootStoolCount !== count) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      if (state.ladder[y][x] === '') {
        state.ladder[y][x] = randomFootStool();
        count += 1;
      }
    }
  };

  /**
   * funtion to validate correct ladder structure
   * @param width ladder width
   * @param height ladder height
   * @returns validate the correct ladder structure
   */
  const analyze = (width: number, height: number) => {
    for (let i = 0; i < height; i++) {
      for (let j = 1; j < width - 1; j++) {
        if (state.ladder[i][j - 1] === LADDER_FOOT_STOOLS[0] && state.ladder[i][j + 1] === LADDER_FOOT_STOOLS[0]) {
          return false;
        }

        if (state.ladder[i][j - 1] === LADDER_FOOT_STOOLS[1] && state.ladder[i][j + 1] === LADDER_FOOT_STOOLS[2]) {
          return false;
        }

        if (state.ladder[i][j - 1] === LADDER_FOOT_STOOLS[2] && state.ladder[i][j + 1] === LADDER_FOOT_STOOLS[1]) {
          return false;
        }
      }
    }

    return true;
  };

  /**
   * data structure setup function for ladder move
   * @param width ladder width
   * @param height ladder height
   */
  const setLadderGraph = (width: number, height: number) => {
    ladderGraph = Array.from(new Array(height * 3), () => new Array(width * 2 - 1).fill(0));

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const footStool = state.ladder[i][j];

        switch (footStool) {
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

    const startAndEndLine = new Array(width * 2 - 1).fill(0).map((_, i) => (i % 4 === 0 ? 1 : 0));

    ladderGraph.unshift(startAndEndLine);
    ladderGraph.push(startAndEndLine);
  };

  /**
   * validate graph coordinates function
   * @param y coordinate
   * @param x coordinate
   * @returns verification result
   */
  const isValidGraphRange = (y: number, x: number) => {
    if (y < 0 || x < 0 || y >= ladderGraph.length || x >= ladderGraph[0].length) return false;
    return true;
  };

  /**
   * ladder move function
   * @param y coordinate
   * @param x coordinate
   * @param d previous direction
   * @returns destination x coordinate
   */
  const move = (y: number, x: number, d = ''): number => {
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
  };

  /**
   * game result print function
   */
  const display = (width: number, height: number, players: string[], goals: string[]) => {
    setLadderGraph(width, height);

    const ladderGraphWidth = ladderGraph[0].length;
    const ladderGraphHeight = ladderGraph.length;

    for (let i = 0; i < players.length; i++) {
      visited = Array.from(new Array(ladderGraphHeight), () => new Array(ladderGraphWidth).fill(0));

      const player = players[i];
      const goal = goals[move(0, i * 4) / 4];

      state.result.push({
        start: player,
        end: goal,
      });
    }
  };

  switch (action.type) {
    case 'start_game': {
      const { width, height, players, goals } = action;

      do {
        reset(width, height);
        randomFill(width, height);
      } while (!analyze(width, height));

      display(width, height, players, goals);

      return state;
    }

    case 'init_game': {
      const { width, height } = action;

      reset(width, height);

      return state;
    }
  }
}
