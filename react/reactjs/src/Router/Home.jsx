import { Link } from 'react-router';

function Home() {
  return (
    <div className='text-gray-50 h-full flex justify-center items-center'>
      <Link
        to='/register'
        className='rounded-xl flex items-center justify-center bg-emerald-800 w-32 text-2xl h-12'
      >
        Start
      </Link>
    </div>
  );
}

export default Home;
