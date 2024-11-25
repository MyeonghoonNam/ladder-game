import { useState, useEffect } from 'react';
import { PlayerCounter, Ladder } from './components';
import { useFunnel } from 'hooks';

import * as Styled from './styled';

const INITIAL_COUNT = 2;
const LADDER_GAME_STEPS = ['counter', 'game', 'result'] as const;

export default function App() {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [Funnel, nextStep] = useFunnel(LADDER_GAME_STEPS, { initialStep: 'counter' });

  const decrementCount = () => {
    setCount((state) => state - 1);
  };

  const incrementCount = () => {
    setCount((state) => state + 1);
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
            count={count}
            onDecrementButtonClick={decrementCount}
            onIncrementButtonClick={incrementCount}
          />
          <button type="button" onClick={() => nextStep('game')}>
            확인
          </button>
        </Funnel.Step>
        <Funnel.Step name="game">
          <Ladder playerCount={count} onNext={() => nextStep('result')} onPrev={() => nextStep('counter')} />
        </Funnel.Step>
        <Funnel.Step name="result">
          <div>Result !!</div>
          <button
            type="button"
            onClick={() => {
              nextStep('counter');
              setCount(INITIAL_COUNT);
            }}>
            초기화
          </button>
        </Funnel.Step>
      </Funnel>
    </Styled.Container>
  );
}
