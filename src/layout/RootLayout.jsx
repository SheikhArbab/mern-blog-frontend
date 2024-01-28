import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer, ScrollTop } from '../components/index'

const RootLayout = () => {
  return (
    <div>
      <ScrollTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default RootLayout
