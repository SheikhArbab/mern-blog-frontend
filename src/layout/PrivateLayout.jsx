import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateLayout = () => {
    const {  token } = useSelector(state => state.auth)
    return token  ? <Outlet /> : <Navigate to={'/sign-in'} />
}

export default PrivateLayout
