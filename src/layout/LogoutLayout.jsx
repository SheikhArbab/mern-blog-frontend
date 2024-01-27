import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LogoutLayout = () => {
    const { token } = useSelector(state => state.auth)
    return token ? <Navigate to={'/'} /> : <Outlet />
}
export default LogoutLayout
