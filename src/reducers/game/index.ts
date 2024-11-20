import { LADDER_FOOT_STOOLS } from 'constants/ladder';
import { type Ladder } from 'models';

type Action =
  | { type: 'start_game'; width: number; height: number }
  | { type: 'init_game'; width: number; height: number }
  | { type: 'start_game'; width: number; height: number };

export const initialState: Ladder = [[]];

export function gameReducer(state: Ladder, action: Action) {
  /**
   * ladder structure initialization function without footStool
   */
  const reset = (width: number, height: number) => {
    state = Array.from(new Array(height), () => new Array(width).fill(''));
  };

  /**
   * function for getting the total number of random footStool
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
   */
  const randomFill = (width: number, height: number) => {
    const totalFootStoolCount = randomFootStoolCount(width, height);
    let count = 0;

    while (totalFootStoolCount !== count) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      state[y][x] = randomFootStool();
      count += 1;
    }
  };

  /**
   * funtion to validate correct ladder structure
   * @returns validate the correct ladder structure
   */
  const analyze = (width: number, height: number) => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width - 1; j++) {
        if (state[i][j] === LADDER_FOOT_STOOLS[0] && state[i][j + 1] === LADDER_FOOT_STOOLS[0]) {
          return false;
        }

        if (state[i][j] === LADDER_FOOT_STOOLS[1] && state[i][j + 1] === LADDER_FOOT_STOOLS[2]) {
          return false;
        }

        if (state[i][j] === LADDER_FOOT_STOOLS[2] && state[i][j + 1] === LADDER_FOOT_STOOLS[1]) {
          return false;
        }
      }
    }

    return true;
  };

  switch (action.type) {
    case 'start_game': {
      const { width, height } = action;

      do {
        reset(width, height);
        randomFill(width, height);
      } while (!analyze(width, height));

      return state;
    }

    default: {
      new Error();
    }
  }
}
