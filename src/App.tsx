import { type ChangeEvent, useState, useEffect } from 'react';
import { PlayerCounter, InputList } from './components';
import { FlexBox } from './styles/common';
import * as Styled from './styled';

function App() {
  const [count, setCount] = useState(2);
  const [players, setPlayers] = useState(['']);
  const [destination, setDestination] = useState(['']);
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

  const handlePlayerInputChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    setPlayers((state) => state.map((v, i) => (i === idx ? e.target.value : v)));
  };

  const handleDestinationInputChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    setDestination((state) => state.map((v, i) => (i === idx ? e.target.value : v)));
  };

  useEffect(() => {
    const inputList = hasCount ? new Array(count).fill('') : [''];
    setPlayers(inputList);
    setDestination(inputList);
  }, [hasCount]);

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
        <FlexBox>
          <InputList values={players} onChange={handlePlayerInputChange} />
          <InputList values={destination} onChange={handleDestinationInputChange} />
        </FlexBox>
      )}
    </Styled.Container>
  );
}

export default App;
