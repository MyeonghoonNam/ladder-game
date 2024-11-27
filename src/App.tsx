import { useState, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { PlayerCounter, Ladder, Result } from './components';
import { useFunnel } from 'hooks';
import { gameReducer, initialState } from 'reducers/game';

import * as Styled from './styled';

const INITIAL_COUNT = 2;
const LADDER_HEIGHT = 5;
const LADDER_GAME_STEPS = ['counter', 'game', 'result'] as const;

export default function App() {
  const [playerCount, setPlayerCount] = useState(INITIAL_COUNT);
  const [Funnel, nextStep] = useFunnel(LADDER_GAME_STEPS, { initialStep: 'counter' });
  const [game, dispatch] = useImmerReducer(gameReducer, initialState);

  const decrementCount = () => {
    setPlayerCount((state) => state - 1);
  };

  const incrementCount = () => {
    setPlayerCount((state) => state + 1);
  };

  useEffect(() => {
    const setScreenSize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setScreenSize();
  }, []);

  return (
    <Styled.Container className="App">
      <Funnel>
        <Funnel.Step name="counter">
          <PlayerCounter
            count={playerCount}
            onDecrementButtonClick={decrementCount}
            onIncrementButtonClick={incrementCount}
          />
          <button type="button" onClick={() => nextStep('game')}>
            확인
          </button>
        </Funnel.Step>
        <Funnel.Step name="game">
          <Ladder
            ladder={game.ladder}
            playerCount={playerCount}
            onNext={() => nextStep('result')}
            onPrev={() => nextStep('counter')}
            onStartGame={() => {
              dispatch({
                type: 'start_game',
                width: playerCount * 2 - 1,
                height: LADDER_HEIGHT,
              });
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="result">
          <Result result={game.result} />
          <button
            type="button"
            onClick={() => {
              nextStep('counter');
              setPlayerCount(INITIAL_COUNT);
            }}>
            초기화
          </button>
        </Funnel.Step>
      </Funnel>
    </Styled.Container>
  );
}
