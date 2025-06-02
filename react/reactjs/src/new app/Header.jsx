import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-gray-800 text-white p-4'>
      <nav>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/signin'>Sign In</Link>
          </li>

          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
