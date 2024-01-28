import React, { useEffect, useState } from 'react'
import { IoLogOut } from "react-icons/io5";
import { HiUser,  HiDocumentText,HiUserGroup } from 'react-icons/hi'
import { Sidebar } from 'flowbite-react'
import { currentUser } from '../redux/features/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

const DashSidebar = () => {


    const location = useLocation()

    const [tab, setTab] = useState('')

    const { user } = useSelector(state => state.auth)

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

    const dispatch = useDispatch()

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link
                        to={'/dashboard?tab=profile'}>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={user.IsAdmin ? "Admin" : "User"}
                            labelColor='dark'
                            as={'div'} >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {
                        user.IsAdmin && <Link
                            to={'/dashboard?tab=posts'}>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiDocumentText} 
                                labelColor='dark'
                                as={'div'}  >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    }
                    {
                        user.IsAdmin && <Link
                            to={'/dashboard?tab=users'}>
                            <Sidebar.Item
                                active={tab === 'users'}
                                icon={HiUserGroup} 
                                labelColor='dark'
                                as={'div'}  >
                               Users
                            </Sidebar.Item>
                        </Link>
                    }
                    <div
                        onClick={() => dispatch(currentUser({ user: '', token: '' }))}>
                        <Sidebar.Item
                            icon={IoLogOut }
                            className="cursor-pointer"
                            as={'div'}>
                            Sign Out
                        </Sidebar.Item>
                    </div>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar
