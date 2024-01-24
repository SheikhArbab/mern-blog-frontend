import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateLayout = () => {
    const { user } = useSelector(state => state.auth)
    return user ? <Outlet /> : <Navigate to={'/sign-in'} />
}

export default PrivateLayout
