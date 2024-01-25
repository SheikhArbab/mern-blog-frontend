import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
const AdminLayout = () => {

    const { user } = useSelector((state) => state.auth);

    return user.IsAdmin ? <Outlet /> : <Navigate to={'/'} />
}

export default AdminLayout
