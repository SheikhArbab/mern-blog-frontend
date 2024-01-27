import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { DashSidebar, DashProfile,DashPosts } from '../components/index'
import { useSelector } from 'react-redux';

const Dashboard = ({setProgress}) => {

 

  const location = useLocation()

  const {user} = useSelector(state => state.auth)

  const [tab, setTab] = useState('')

  useEffect(() => {
    // document.title = `Dashboard | SuperTech Institute of Computer Sciences`;
    setProgress(20)
    setTimeout(() => {

      setProgress(100)
    }, 400);
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])


  return (
    <div className='min-h-screen flex flex-col md:flex-row relative items-start'>
      <div className='md:w-56 md:sticky top-0 z-50  h-screen'>
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* posts... */}
      {user.IsAdmin && tab === 'posts' && <DashPosts />}
    </div>
  )
}

export default Dashboard
