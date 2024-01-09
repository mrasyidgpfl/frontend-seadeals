import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './hooks/useAuth';

type RolesProps = {
  allowedRoles: string[]
};

const RequireAuth = ({ allowedRoles }: RolesProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.roles?.find((role:string) => allowedRoles?.includes(role))) {
    return <Outlet />;
  }
  return auth?.accessToken
    ? <Navigate to="/seller/register" state={{ from: location }} replace />
    : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
