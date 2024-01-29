import React, { useEffect } from 'react';
import { PostUpdate } from '../components/index'
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../redux/services/post';
import { Spinner } from 'flowbite-react';

const UpdatePost = ({ setProgress }) => {
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetPostByIdQuery(id);


  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(100);
    }, 400);
  }, [setProgress]);




  return (


    isLoading ? <div className='w-full h-screen flex items-center justify-center '>
      <Spinner size={'xl'} />
    </div> : <PostUpdate data={data} id={id} refetch={refetch}/>




  );
};

export default UpdatePost;
