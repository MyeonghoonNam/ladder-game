import { useState } from 'react';
import { PlayerCounter } from './components';

function App() {
  const [count, setCount] = useState(2);

  const decrementCount = () => {
    setCount((state) => state - 1);
  };

  const incrementCount = () => {
    setCount((state) => state + 1);
  };

  return (
    <div className="App">
      <PlayerCounter count={count} onDecrementButtonClick={decrementCount} onIncrementButtonClick={incrementCount} />
    </div>
  );
}

export default App;
