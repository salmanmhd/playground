import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>hi there, I am a front running on docker, UPDATED</h2>
      <div className='counter'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button className='red' onClick={() => setCount(0)}>
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
