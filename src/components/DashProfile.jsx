import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BiSolidShow, BiSolidHide, BiCamera, } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation, useDeleteUserMutation } from '../redux/services/auth'
import { currentUser } from '../redux/features/authSlice'
import { Label, TextInput, Button, Spinner, Alert, Modal } from 'flowbite-react';
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const DashProfile = () => {



  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  const [showPass, setShowPass] = useState(false);

  const [showModal, setShowModal] = useState(false)

  const fileRef = useRef(null);

  const [anyRes, setAnyRes] = useState('')

  React.useEffect(() => {

    setTimeout(() => {
      setAnyRes('')
    }, 2000);

  }, [anyRes])

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation()



  const [deleteUser] = useDeleteUserMutation();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: user.username || '',
      email: user.email || '',
      password: user.password || '',
      profilePicture: user.profilePicture || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (formValues) => {
      let updateData = formValues; // Default to formValues

      // Check if the profile picture is the same as the user's current profile picture
      if (formValues.profilePicture === user.profilePicture) {
        // If the profile picture is the same, exclude it from the update
        const { profilePicture, ...restOfData } = formValues;
        updateData = restOfData;

      }

      try {
        const res = await updateUser({ updateData, userId: user._id });

        if (res.error && res.error.data && res.error.data.message) {
          setAnyRes(res.error.data.message);
        } else if (res.data && res.data.message) {
          setAnyRes(res.data.message);
          const { updatedUser } = res.data;
          dispatch(currentUser({ user: updatedUser, token }));
        }
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    },

  })

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setFieldValue('profilePicture', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };



  const handleDeleteUser = async () => {
    setShowModal(false)

    await deleteUser(user._id)
    dispatch(currentUser({ user:null, token:null }));
  };



  return (
    <div className="max-w-lg mx-auto p-3 w-full">


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
            className='absolute top-0 right-3 font-bold cursor-pointer text-teal-900'>x</span>
        </div>

      }


      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>

        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileRef}
          onChange={handleFileChange}
        />

        <figure
          className="w-32 h-32 md:w-52 md:h-52 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative group"
          onClick={() => fileRef.current.click()}
        >
          <img
            src={values.profilePicture || user.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-4 border-purple-900 object-cover"
          />
          <div className='duration-300 transition-all opacity-0 group-hover:opacity-100 w-full bg-black/70 absolute top-0 left-0 h-full border-4 border-purple-900 rounded-full' />
          <BiCamera size={'40%'}
            color='white'
            className=' duration-300 transition-all opacity-0 group-hover:opacity-100 absolute top-[52%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
        </figure>

        <div className="w-100 h-20">
          <Label value="Your name" htmlFor="e" />
          <TextInput
            id="username"
            type="text"
            placeholder="your-company@gmail.com"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          {errors.username && touched.username ? (
            <span className="text-red-600 text-xs absolute">{errors.username}</span>
          ) : null}
        </div>



        <div className="w-100 h-20">
          <Label value="Your email" htmlFor="email" />
          <TextInput
            id="email"
            type="email"
            placeholder="your-company@gmail.com"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email ? (
            <span className="text-red-600 text-xs absolute">{errors.email}</span>
          ) : null}
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
          outline
          className={`${isLoading && 'opacity-70 cursor-not-allowed'} mt-4  w-full h-10`}
          gradientDuoTone={'purpleToPink'}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? <Spinner color={'purple'} /> : "Update"}

        </Button>

        {
          user.IsAdmin &&
          <Link to={'create-post'}>
            <Button
              type='button'
              className={` mt-4  w-full h-10`}
              gradientDuoTone={'purpleToPink'}
            >
              Create a post

            </Button>
          </Link>
        }

      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span
          onClick={() => {
            setShowModal(true)
          }}
          className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer' onClick={() => dispatch(currentUser({ user: '', token: '' }))}>Sign Out</span>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size={'md'}>

        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineInformationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
            <div className='flex gap-4 justify-center'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>

        </Modal.Body>

      </Modal>
    </div>
  );
};

export default DashProfile;
