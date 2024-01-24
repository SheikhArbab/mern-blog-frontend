import React, { useEffect, useState } from 'react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { Sidebar } from 'flowbite-react'
import { currentUser } from '../redux/features/authSlice'
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

const DashSidebar = () => {


    const location = useLocation()

    const [tab, setTab] = useState('')

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
                <Sidebar.ItemGroup>
                    <Link to={'/dashboard?tab=profile'}>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as={'div'} className={'mb-2'}>
                            Profile
                        </Sidebar.Item>
                        <div onClick={() => dispatch(currentUser({ user: '', token: '' }))}>
                            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" as={'div'}>
                                Sign Out
                            </Sidebar.Item>
                        </div>
                    </Link>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar
