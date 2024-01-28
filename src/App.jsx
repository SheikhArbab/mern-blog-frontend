import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { RootLayout, PrivateLayout, AdminLayout, LogoutLayout } from './layout/index';
import { Home, About, Dashboard, SignIn, SignUp, Projects, CreatePost, UpdatePost, Post } from './pages/index';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { currentUser } from './redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";

const App = () => {

  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;

    if (token) {
      intervalId = setInterval(() => {
        const { exp } = jwtDecode(token);
        if (exp < Date.now() / 1000) {
          alert("Your session has expired. Please log in again to continue using the app.");
          dispatch(currentUser({ user: null, token: null }));
        }
      }, 3000)
    } return () => clearInterval(intervalId)
  }, [token, dispatch]);



  const [progress, setProgress] = useState(0);



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>

        <Route index element={<Home setProgress={setProgress} />} />
        <Route path="/about" element={<About setProgress={setProgress} />} />
        <Route path="/post/:slug" element={<Post setProgress={setProgress} />} />
        <Route path="/projects" element={<Projects setProgress={setProgress} />} />


        <Route element={<LogoutLayout />} >
          <Route path="/sign-in" element={<SignIn setProgress={setProgress} />} />
          <Route path="/sign-up" element={<SignUp setProgress={setProgress} />} />
        </Route>


        <Route element={<PrivateLayout />} >
          <Route path="/dashboard" element={<Dashboard setProgress={setProgress} />} />

          <Route element={<AdminLayout />} >
            <Route path="/dashboard/create-post" element={<CreatePost setProgress={setProgress} />} />
            <Route path="/update-post/:id" element={<UpdatePost setProgress={setProgress} />} />
          </Route>


        </Route>

      </Route>
    )
  );



  return (
    <>
      <LoadingBar color='purple' shadow={true} progress={progress} onLoaderFinished={() => setProgress(0)} />
      <RouterProvider router={router} />
    </>
  )
}

export default App