import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

type PrivateRouterProps = {
    children?: JSX.Element;
    redirectPath?: string;
};

export default function PrivateRouterAuth({
                                              children,
                                              redirectPath = '/',
                                          }: PrivateRouterProps): JSX.Element {
    const { user } = useAppSelector((state) => state.auth);
    if (user.status === 'authenticated') return <Navigate to={redirectPath} />;
    return children || <Outlet />;
}
