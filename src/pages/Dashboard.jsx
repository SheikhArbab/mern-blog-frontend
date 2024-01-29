import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { DashSidebar, DashProfile, DashPosts, DashUser } from '../components/index'
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { RxHamburgerMenu } from "react-icons/rx";

const Dashboard = ({ setProgress }) => {



  const location = useLocation()

  const { user } = useSelector(state => state.auth)

  const [tab, setTab] = useState('')
  const [toggle, setToggle] = useState(true)

  useEffect(() => { 
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

      <Button className='md:hidden mt-5 ml-2'  onClick={() => setToggle(!toggle)}>
      <RxHamburgerMenu />
      </Button>
      <div className={`${toggle && '-translate-x-[1000px] '} md:w-56 w-full md:sticky absolute duration-300 transition-all left-0 md:-translate-x-[0px] top-0 z-50  h-screen`} >
        {/* sidebar */}
        <DashSidebar  toggle={toggle} setToggle={setToggle}/>
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* posts... */}
      {user.IsAdmin && tab === 'posts' && <DashPosts />}
      {/* users... */}
      {user.IsAdmin && tab === 'users' && <DashUser />}
    </div>
  )
}

export default Dashboard
