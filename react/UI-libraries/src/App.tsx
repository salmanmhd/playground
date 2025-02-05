import { useState } from 'react';
import Profile from './Profile';
import { CardDemo } from './Profile2';
import { Button } from './components/ui/button';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
      className={` flex justify-center space-x-6 pt-10  ${
        darkMode ? 'dark' : ''
      }`}
    >
      <Button
        className='fixed top-5 right-5'
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? 'Light' : 'Dark'}
      </Button>
      <Profile />
      <CardDemo />
    </div>
  );
}

export default App;
