import { useState } from 'react';
import { PlayerCounter, Ladder } from './components';
import { FlexBox } from './styles/common';
import * as Styled from './styled';

function App() {
  const [count, setCount] = useState(2);
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
        <Ladder playerCount={count} />
      )}
    </Styled.Container>
  );
}

export default App;
