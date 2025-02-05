import { useState } from 'react';
import { useImmerReducer } from 'use-immer';
import { PlayerCounter, Ladder, Result, Spacing } from './components';
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

  const handleDecrementCountButtonClick = () => {
    setPlayerCount((state) => state - 1);
  };

  const handleIncrementCountButtonClick = () => {
    setPlayerCount((state) => state + 1);
  };

  const handleSetPlayerCounterConfirmButtonClick = () => {
    nextStep('game');
  };

  const handleLadderPrevButtonClick = () => {
    nextStep('counter');
  };

  const handleLadderNextButtonClick = () => {
    nextStep('result');
  };

  const handleStartGameButtonClick = (players: string[], goals: string[]) => {
    dispatch({
      type: 'start_game',
      width: playerCount * 2 - 1,
      height: LADDER_HEIGHT,
      players,
      goals,
    });
  };

  const handleResetGameButtonClick = () => {
    nextStep('counter');
    setPlayerCount(INITIAL_COUNT);
    dispatch({
      type: 'init_game',
      width: playerCount * 2 - 1,
      height: LADDER_HEIGHT,
    });
  };

  return (
    <Styled.Container className="App">
      <Styled.Contents>
        <Styled.Header>사다리 게임</Styled.Header>

        <Spacing size="small" />

        <Funnel>
          <Funnel.Step name="counter">
            <PlayerCounter
              count={playerCount}
              onDecrementButtonClick={handleDecrementCountButtonClick}
              onIncrementButtonClick={handleIncrementCountButtonClick}
              onConfirmButtonClick={handleSetPlayerCounterConfirmButtonClick}
            />
          </Funnel.Step>

          <Funnel.Step name="game">
            <Ladder
              ladder={game.ladder}
              playerCount={playerCount}
              onPrev={handleLadderPrevButtonClick}
              onNext={handleLadderNextButtonClick}
              onStartGame={handleStartGameButtonClick}
            />
          </Funnel.Step>

          <Funnel.Step name="result">
            <Result result={game.result} onReset={handleResetGameButtonClick} />
          </Funnel.Step>
        </Funnel>
      </Styled.Contents>
    </Styled.Container>
  );
}
