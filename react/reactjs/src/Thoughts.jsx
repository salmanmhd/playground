import { useState } from 'react';

function Thoughts() {
  const [count, setCount] = useState(0);
  const [thoughts, setThoughts] = useState(["I can't do", 'You are amazing']);
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('inside the hanlder');
    if (!input) {
      return;
    }

    setThoughts([...thoughts, input]);
    setInput('');
  }
  return (
    <div className='flex flex-col  items-center justify-center h-screen py-6 '>
      <NavBar />
      <main className='flex flex-col py-6  px-6 w-96 h-full border border-gray-300 rounded-lg'>
        <div className=' counter p-2 flex flex-col w-full border border-gray-300 rounded-lg'>
          <button onClick={() => setCount(count + 1)} className='text-5xl h-56'>
            {count}
          </button>
          <button
            onClick={() => setCount(count - 1)}
            className='text-2xl border border-gray-300 rounded-lg'
          >
            -
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className='input-field mt-6 '>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter your thoughts'
            className='border border-gray-300 h-10 px-4 w-full rounded-lg bg-transparent'
          />
        </form>
        <div className='flex flex-col gap-3 px-4 py-4 thoughts flex-grow mt-6 border border-gray-300 rounded-lg overflow-auto h scrollbar-hidden'>
          {thoughts.map((thought, i) => (
            <ThooughtList key={i} thoughts={thought} />
          ))}
        </div>
      </main>
    </div>
  );
}
function NavBar() {
  return (
    <nav className='mb-4 w-96'>
      <ul className='flex space-x-4'>
        <ListItem text={'Home'} />
        <ListItem text={'About'} />
      </ul>
    </nav>
  );
}

function ListItem({ text }) {
  return (
    <li className='cursor-pointer border border-gray-300 rounded-lg  w-14 text-center hover:bg-gray-300 hover:text-gray-800 transition-all duration-200'>
      {text}
    </li>
  );
}

function ThooughtList({ thoughts = "I can't do" }) {
  return (
    <div className=' border border-gray-300 rounded-lg flex items-center pl-2 text-lg'>
      {thoughts}
    </div>
  );
}

export default Thoughts;
