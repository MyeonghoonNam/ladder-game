import { useState, useEffect } from 'react';
import { PlayerCounter, Ladder } from './components';
import { FlexBox } from './styles/common';
import * as Styled from './styled';

const INITIAL_COUNT = 2;

function App() {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [hasCount, setHasCount] = useState(false);

  const decrementCount = () => {
    setCount((state) => state - 1);
  };

  const incrementCount = () => {
    setCount((state) => state + 1);
  };

  const handleCountSetupButtonClick = () => {
    setHasCount(true);
  };

  const handleCancleButtonClick = () => {
    setHasCount(false);
    setCount(INITIAL_COUNT);
  };

  useEffect(() => {
    const setScreenSize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setScreenSize();
  }, []);

  return (
    <Styled.Container className="App">
      {!hasCount ? (
        <FlexBox>
          <PlayerCounter
            count={count}
            onDecrementButtonClick={decrementCount}
            onIncrementButtonClick={incrementCount}
          />
          <button type="button" onClick={handleCountSetupButtonClick}>
            확인
          </button>
        </FlexBox>
      ) : (
        <Ladder playerCount={count} onCancle={handleCancleButtonClick} />
      )}
    </Styled.Container>
  );
}

export default App;
