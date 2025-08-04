import type { JSX }             from 'react';
import { Navigate }             from 'react-router';
import useAuthenticationContext from '../context/authenticationContext';

const AuthenticatedRoutes = ({ children, mustBeAuthenticated }:{children: JSX.Element, mustBeAuthenticated: boolean}) => {

  const { isAuthenticated, loading } = useAuthenticationContext();

  if (loading) return <div>Loading...</div>

  if (isAuthenticated !== mustBeAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthenticatedRoutes;