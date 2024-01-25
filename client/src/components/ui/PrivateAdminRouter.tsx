import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

type PrivateRouterProps = {
  children?: JSX.Element;
  redirectPath?: string;
};

export default function PrivateAdminRouter({
  children,
  redirectPath = '/',
}: PrivateRouterProps): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);
  if (user.roleId !== 3) return <Navigate to={redirectPath} />;
  return children || <Outlet />;
}
