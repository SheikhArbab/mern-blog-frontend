import React from 'react'
import { RootLayout, PrivateLayout, AdminLayout } from './layout/index';
import { Home, About, Dashboard, SignIn, SignUp, Projects, CreatePost } from './pages/index';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

const App = () => {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateLayout />} >

          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<AdminLayout />} >

            <Route path="/dashboard/create-post" element={<CreatePost />} />

          </Route>

        </Route>

      </Route>
    )
  );


  return (
    <RouterProvider router={router} />
  )
}

export default App
