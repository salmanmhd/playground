import { useLocation, useNavigate } from 'react-router';
import AuthConsumer from './Authcontext';

function Signin() {
  const { authed, login, logout } = AuthConsumer();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    login().then(() => {
      navigate(state?.path || '/dashboard');
    });
  };

  return (
    <>
      <div>{authed ? 'You are logged in' : 'You are logged out'}</div>
      <button
        className='bg-gray-800 border border-white hover:bg-gray-900 text-white font-bold py-2 px-4 rounded m-10'
        onClick={authed ? logout : handleLogin}
      >
        {authed ? 'Logout' : 'Login'}
      </button>
    </>
  );
}

export default Signin;
