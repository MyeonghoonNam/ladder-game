import { useState } from 'react';

function App() {
  const [state, setState] = useState(0);

  return (
    <div className="App">
      <button type="button" onClick={() => setState((state) => state + 1)}>
        Click
      </button>
      <span>{state}</span>
    </div>
  );
}

export default App;
