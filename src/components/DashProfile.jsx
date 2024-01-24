import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Label, TextInput, Button, Spinner } from 'flowbite-react';
import { BiSolidShow, BiSolidHide, BiCamera } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../redux/services/auth'
import { currentUser } from '../redux/features/authSlice'
import { useDispatch } from 'react-redux';

const DashProfile = () => {
  const { user } = useSelector((state) => state.auth);


  const dispatch = useDispatch()

  const [showPass, setShowPass] = useState(false);

  const fileRef = useRef(null);


  const [updateUser, { isLoading }] = useUpdateUserMutation()

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
      if (formValues.profilePicture === user.profilePicture) {
        const { profilePicture, ...restOfData } = formValues;
        formValues = restOfData;
      }

      try {
        await updateUser({ updateData: formValues, userId: user._id });

      } catch (error) {
        console.error('Error during form submission:', error);
      }
    },

  });

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

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
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
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer' onClick={() => dispatch(currentUser({ user: '', token: '' }))}>Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
