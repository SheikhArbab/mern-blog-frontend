import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Alert, Spinner } from 'flowbite-react';
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useGetPostsQuery } from '../redux/services/post';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeletePostMutation } from "../redux/services/post"
import '/empty.webp'

const DashPosts = () => {
  const { user } = useSelector(state => state.auth);
  const { data, refetch, isLoading: isPostFetch } = useGetPostsQuery({ userId: user._id });
  const [userPosts, setUserPosts] = useState([]);


  const [deletePost, { isLoading, isError }] = useDeletePostMutation();
  const [showModal, setShowModal] = useState(false)

  const [postId, setPostId] = useState('')

  const [anyRes, setAnyRes] = useState()

  const fetchPosts = async () => {
    try {
      setUserPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [data]);

  const handleDeletePost = async () => {
    setShowModal(false)
    const res = await deletePost(postId)
    if (res.error && res.error.data && res.error.data.message) {
      refetch()
      setUserPosts(data.posts);
      setAnyRes(res.error.data.message);
    } else if (res.data && res.data.message) {
      refetch()
      setUserPosts(data.posts);

      setAnyRes(res.data.message);

    }
  }



  if (isPostFetch) {
    return <div
      className='flex h-screen w-full items-center justify-center flex-col text-4xl gap-1'>
      <Spinner
        className='h-20 w-20' /> Loading...
    </div>;
  }


  return (
    <div className=' w-full overflow-hidden overflow-x-auto p-6'>

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

      {user.IsAdmin && userPosts.length > 0 ? (

        <div className='w-full overflow-hidden overflow-x-auto'>


          <h1 className='w-fit mx-auto mb-5 font-bold text-5xl'>Your Posts</h1>

          <Table hoverable className='shadow-md   ' >

            <Table.Head>

              <Table.HeadCell>Date Update</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>

            </Table.Head>

            {
              userPosts.map(post => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row>

                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className='w-32 rounded-md  h-16 object-cover bg-gray-500' />
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>

                    <Table.Cell>
                      <span
                        onClick={() => {
                          setPostId(post._id)
                          setShowModal(true)
                        }}
                        className='font hover:text-red-600 cursor-pointer'><FaTrash /></span>


                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`} className='hover:text-teal-500'>
                        <span><FaRegEdit /></span>
                      </Link>
                    </Table.Cell>



                  </Table.Row>
                </Table.Body>
              ))
            }

          </Table>

          <button className=' w-fit block mx-auto pt-4 hover:text-teal-500 duration-300'>Show more</button>

        </div>

      ) : (
        <figure
          className='flex items-center flex-col justify-center  h-screen'>
          <img
            className='md:w-64 w-[50%] object-contain'
            src={'empty.webp'}
            alt="no posts" />
          <p className='font-bold md:text-2xl text-xs sm:text-lg'>No posts available for the user.</p>
        </figure>

      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size={'md'}>

        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineInformationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>
            <div className='flex gap-4 justify-center'>
              <Button color='failure' onClick={() => handleDeletePost()}>
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

export default DashPosts;
