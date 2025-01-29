import { useState, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { PlayerCounter, Ladder, Result, Button, Spacing } from './components';
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
      <Styled.Contents>
        <Styled.Header>사다리 게임</Styled.Header>
        <Spacing size="small" />
        <Funnel>
          <Funnel.Step name="counter">
            <Styled.SubHeader>
              <p>출발지 수를 선택하세요.</p>
              <p>※ 최대 10개까지 선택 가능합니다.</p>
            </Styled.SubHeader>

            <Spacing size="medium" />

            <PlayerCounter
              count={playerCount}
              onDecrementButtonClick={handleDecrementCountButtonClick}
              onIncrementButtonClick={handleIncrementCountButtonClick}
            />

            <Spacing size="medium" />

            <Styled.Controller>
              <Button type="button" size="large" onClick={() => nextStep('game')}>
                확인
              </Button>
            </Styled.Controller>
          </Funnel.Step>
          <Funnel.Step name="game">
            <Styled.SubHeader>
              <p>출발지와 도착지 내용을 입력해주세요.</p>
            </Styled.SubHeader>

            <Spacing size="medium" />

            <Ladder
              ladder={game.ladder}
              playerCount={playerCount}
              onNext={() => nextStep('result')}
              onPrev={() => nextStep('counter')}
              onStartGame={handleStartGameButtonClick}
            />
          </Funnel.Step>
          <Funnel.Step name="result">
            <Result result={game.result} />
            <Spacing size="medium" />
            <Button type="button" variant={'secondary'} size="large" onClick={handleResetGameButtonClick}>
              초기화
            </Button>
          </Funnel.Step>
        </Funnel>
      </Styled.Contents>
    </Styled.Container>
  );
}
