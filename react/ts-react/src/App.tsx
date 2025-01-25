import { useState } from 'react';

function App() {
  return (
    <>
      <Counter />
    </>
  );
}

function Counter(): React.JSX.Element {
  const [count, setCount] = useState(0);
  function handleInc() {
    setCount(count + 1);
  }
  function handleDec() {
    setCount(count - 1);
  }
  return (
    <div>
      <h1>Counter</h1>
      <div className='flex'>
        <button onClick={handleDec}>-</button>
        <p>{count}</p>
        <button onClick={handleInc}>+</button>
      </div>
    </div>
  );
}

export default App;
