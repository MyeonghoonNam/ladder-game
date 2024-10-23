import { useState, useRef } from 'react';
import { type LadderFootStool } from 'models';

interface Props {
  playerCount: number;
}

const useGame = ({ playerCount }: Props) => {
  const width = playerCount - 1;
  const height = 5;
  const footStools: LadderFootStool[] = ['---', '\\-\\', '/-/'];
  const ladderRef = useRef<string[][]>([[]]);
  const [ladder, setLadder] = useState<string[][]>([[]]);

  /**
   * ladder structure initialization function without footStool
   */
  const reset = () => {
    ladderRef.current = Array.from<string, string[]>(new Array(height), () => new Array(width).fill(''));
  };

  /**
   * function for getting the total number of random footStool
   * @returns total number of random footStool
   */
  const randomFootStoolCount = () => {
    return Math.floor(Math.random() * (width * height)) + 1;
  };

  /**
   * function for getting only one footStool of footStools
   * @returns one random footStool
   */
  const randomFootStool = () => {
    return footStools[Math.floor(Math.random() * footStools.length)];
  };

  /**
   * function to fill an empty ladder with random footStools
   */
  const randomFill = () => {
    let totalFootStoolCount = randomFootStoolCount();
    let count = 0;

    while (totalFootStoolCount !== count) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      ladderRef.current[y][x] = randomFootStool();
      count += 1;
    }
  };

  /**
   * funtion to validate correct ladder structure
   * @returns validate the correct ladder structure
   */
  const analyze = () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width - 1; j++) {
        if (ladderRef.current[i][j] === footStools[0] && ladderRef.current[i][j + 1] === footStools[0]) {
          return false;
        }

        if (ladderRef.current[i][j] === footStools[1] && ladderRef.current[i][j + 1] === footStools[2]) {
          return false;
        }

        if (ladderRef.current[i][j] === footStools[2] && ladderRef.current[i][j + 1] === footStools[1]) {
          return false;
        }
      }
    }

    return true;
  };

  const game = () => {
    reset();
    randomFill();

    while (!analyze()) {
      reset();
      randomFill();
    }

    setLadder(ladderRef.current);
  };

  return { ladder, game, reset, randomFill };
};

export default useGame;
