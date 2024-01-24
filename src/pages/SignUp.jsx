import * as Yup from 'yup';
import React, { useState } from 'react'
import {OAuth} from '../components/index'
import { useFormik } from "formik";
import { Label, TextInput, Button, Spinner, Alert } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useCreateUserMutation } from '../redux/services/auth'
const SignUp = () => {




  const [createUser, { isLoading, isError }] = useCreateUserMutation()

  const [anyRes, setAnyRes] = useState('')

  const [showPass, setShowPass] = useState(false)


  const navigate = useNavigate()

  const { handleChange, handleSubmit, handleBlur, touched, errors, values, resetForm } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (formValues) => {
      try {
        const res = await createUser(formValues);
console.log(res);
        if (res.error && res.error.data && res.error.data.message) {
          setAnyRes(res.error.data.message);
        } else if (res.data && res.data.message) {
          setAnyRes(res.data.message);
          setTimeout(() => {
            navigate('/sign-in')
          }, 1500);
        }

      } catch (error) {
        console.error('Error during user creation:', error);
      }
    }


  });
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

        {/* left side */}
        <div className="flex-1">
          <Link to={'/'} className='dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Arbab's</span>
            <span className='dark:text-slate-400 font-bold ml-2'>Blog</span>
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your email and password or with Google.
          </p>
        </div>


        {/* right side */}
        <div className="flex-1">
          {
           !isLoading && anyRes &&
            <div className='relative'>
              <Alert color={`${isError ? 'failure' : 'success'}`} className='mt-5'>
                {anyRes}
              </Alert>
              <span
                onClick={() => {
                  setAnyRes('')
                }}
                className='absolute top-0 right-3 font-bold cursor-pointer'>x</span>
            </div>

          }

          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            <div className='w-100 h-20'>
              <Label value="Your username" htmlFor='username' />
              <TextInput
                id='username'
                type='text'
                placeholder='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username ? <span className='text-red-600 text-xs absolute'>{errors.username}</span> : null}


            </div>

            <div className='w-100 h-20'>
              <Label value="Your email" htmlFor='email' />
              <TextInput
                id='email'
                type='email'
                placeholder='your-company@gmail.com'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? <span className='text-red-600 text-xs absolute'>{errors.email}</span> : null}


            </div>

            <div className='w-100 h-20 relative'>
              <Label value="Your password" htmlFor='password' />
              <TextInput
                id='password'
                type={`${showPass ? 'text' : 'password'}`}
                placeholder='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? <span className='text-red-600 text-xs absolute'>{errors.password}</span> : null}
              <span
                onClick={() => {
                  setShowPass(!showPass)
                }}
                className='absolute right-3 -translate-y-[50%] top-[50%] pt-2 cursor-pointer'>
                {
                  showPass ? <BiSolidHide /> : <BiSolidShow />
                }
              </span>
            </div>

            <Button
              className={`${isLoading && 'opacity-70 cursor-not-allowed'} w-full h-10`}
              gradientDuoTone={'purpleToPink'}
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <Spinner color={'purple'} /> : "Sign up"}

            </Button>
            <OAuth />
          </form>



          <div className='flex gap-2 text-sm mt-5'>

            <span>
              Have an account?
            </span>

            <Link to={'/sign-in'} className='text-blue-500  hover:underline'>
              Sign in
            </Link>

          </div>

        </div>

      </div>
    </div>
  )
}

export default SignUp
