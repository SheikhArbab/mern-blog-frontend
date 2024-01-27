import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery, useUpdatePostMutation } from '../redux/services/post';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextInput, Select, FileInput, Button, Alert, Spinner } from 'flowbite-react';

const UpdatePost = ({ setProgress }) => {
    const { id } = useParams();


  useEffect(() => {
    document.title = `Update Post | MERN - Blogger`;
    setProgress(20);
    setTimeout(() => {
      setProgress(100);
    }, 400);
  }, [setProgress]);

  

  const { data, isLoading: isPostFetch, refetch } = useGetPostByIdQuery(id);

  const [update, { isLoading, isError }] = useUpdatePostMutation();

  const [anyRes, setAnyRes] = useState('');


  if (isPostFetch) {
    return <div className='flex h-screen w-full items-center justify-center flex-col text-4xl gap-1'><Spinner className='h-20 w-20' /> Loading...</div>;
  }

  if (!data) {
    return <p>Post not found</p>;
  }

  const { data: PostData } = data;


  const { handleChange, handleSubmit, handleBlur, touched, errors, values, setFieldValue } = useFormik({
    initialValues: {
      title: PostData.title || '',
      image: PostData.image || '',
      content: PostData.content || '',
      category: PostData.category || ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      category: Yup.string().notOneOf(['uncategorized'], 'Please select a category'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (formValues) => {
      try {
        const updateData = {
          userId: id,
          updateData: formValues,
        };

        const res = await update(updateData);
        console.log("res", res);

        if (res.error && res.error.data && res.error.data.message) {
          console.log(res);
          refetch();
          setAnyRes(res.error.data.message);
        } else if (res.data && res.data.success) {
          refetch();
          console.log("condition", res.data.data);
          setAnyRes(res.data.message);
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },
  });

  const handleQuillChange = (content) => {
    setFieldValue('content', content);
};

const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                setFieldValue('image', reader.result);
            }
        };
        reader.readAsDataURL(file);
    }
};


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      {anyRes &&
        <div className='relative'>
          <Alert color={`${isError ? 'failure' : 'success'}`} className='mt-5'>
            {anyRes}
          </Alert>
          <span
            onClick={() => {
              setAnyRes('');
            }}
            className='absolute top-0 right-3 font-bold cursor-pointer text-teal-900'>x</span>
        </div>
      }
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
      <form
        className='flex flex-col gap-7'
        onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5 sm:flex-row justify-between relative'>
          <div className='relative flex-1'>
            <TextInput
              type='text'
              placeholder='Title'
              id='title'
              name='title'
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className='w-full'
            />
            {errors.title && touched.title ? <span className='text-red-600 text-xs absolute -bottom-4'>{errors.title}</span> : null}
          </div>
          <div className='relative '>
            <Select
              name='category'
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value='uncategorized'>Select a category</option>
              <option value='javascript'>JavaScript</option>
              <option value='reactjs'>React.js</option>
              <option value='mern'>MERN</option>
            </Select>
            {errors.category && touched.category ? <span className='text-red-600 text-xs absolute -bottom-4'>{errors.category}</span> : null}
          </div>
        </div>

        <div className='flex gap-4  items-center justify-center flex-col border-4 border-teal-500 border-dotted p-3 relative '>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => {
              handleFileChange(e);
              handleBlur(e);
            }}
            className='w-full' />
          {values.image &&
            <img
              className='h-full  object-contain'
              src={values.image} />}
          {errors.image && touched.image ? <span className='text-red-600 text-xs absolute bottom-0'>{errors.image}</span> : null}
        </div>

        <div className='relative'>
          <ReactQuill
            theme='snow'
            id='textarea'
            value={values.content}
            onChange={handleQuillChange}
            placeholder='Write something...'
            className='h-72 mb-12'
          />
          {errors.content && touched.content ? <span className='text-red-600 text-xs absolute -bottom-4'>{errors.content}</span> : null}
        </div>
        <Button
          type='submit'
          disabled={isLoading}
          className={isLoading ? 'opacity-60' : ''}
          gradientDuoTone={'purpleToPink'}>
          {isLoading ? <Spinner
            color={'purple'} /> : 'Update'}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost;
