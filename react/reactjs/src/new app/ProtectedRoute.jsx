import { Navigate, useLocation } from 'react-router';
import AuthConsumer from './Authcontext';

function ProtectedRoute({ children }) {
  const { authed } = AuthConsumer();
  const location = useLocation();
  return authed === true ? (
    <>{children}</>
  ) : (
    <Navigate to='/signin' state={{ path: location.pathname }} />
  );
}

export default ProtectedRoute;
