import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './Header';
import HomePage from './Homepage';
import SignIn from './Signin';
import Dashboard from './Dashboard';
import { AuthProvider } from './Authcontext';
import ProtectedRoute from './ProtectedRoute';

const Appnew = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Public route */}
          <Route path='/signin' element={<SignIn />} />

          {/* Protected routes */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect to signin for unknown routes */}
          <Route path='*' element={<Navigate to='/signin' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default Appnew;
