import { NavLink, Outlet } from 'react-router';

function AppLayout() {
  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-gray-800 h-10 items-center flex justify-between px-6 text-lg'>
        <NavLink className=''>Home</NavLink>
        <div className='flex space-x-10'>
          <NavLink
            to='/register'
            className={({ isActive }) =>
              `${isActive ? 'text-emerald-600' : ''}`
            }
          >
            Register
          </NavLink>
          {/* <NavLink
            to='/user'
            className={({ isActive }) =>
              `${isActive ? 'text-emerald-600' : ''}`
            }
          >
            User
          </NavLink> */}
        </div>
      </header>
      <main className='flex-1'>
        <Outlet />
      </main>
      <footer className='bg-emerald-900 h-6 text-green-300 text-center'>
        made with mehnat.
      </footer>
    </div>
  );
}

export default AppLayout;
