import { createBrowserRouter } from 'react-router';
import AppLayout from './AppLayout';
import Home from './Home';
import RegisterPage, { action as formAction } from './RegisterPage';
import UserDetails from './UserDetails';
import { RouterProvider } from 'react-router-dom';

function RouterPage() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          element: <Home />,
          path: '/',
        },
        {
          element: <RegisterPage />,
          path: '/register',
          action: formAction,
        },
        {
          element: <UserDetails />,
          path: '/user/:email',
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterPage;
