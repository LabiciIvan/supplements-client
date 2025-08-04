import type { JSX }             from 'react';
import { Navigate }             from 'react-router';
import useRoleContext           from '../context/roleContext';

const RoleRoute = ({children, allowedRole} : {children: JSX.Element, allowedRole: string}) => {

  const { role, loading } = useRoleContext();

  if (loading) return <div>Loading...</div>;

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;