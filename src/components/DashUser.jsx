import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Alert, Spinner } from 'flowbite-react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { useGetUsersQuery, useDeleteUserMutation } from '../redux/services/auth';
import { FaXmark } from "react-icons/fa6";
import emptyImage from '/empty.webp';  

const DashUser = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: { users: usersD = [], totalUsers, lastMonthUsers } = {}, refetch, isLoading: isPostFetch } = useGetUsersQuery();
 
  const [deleteUser, { isLoading, isError }] = useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);

  const [postId, setPostId] = useState('');
  const [anyRes, setAnyRes] = useState();

  const handleDeleteUser = async () => {
    setShowModal(false);
    const res = await deleteUser(postId);
    if (res.error && res.error.data && res.error.data.message) {
      refetch(); 
      setAnyRes(res.error.data.message);
    } else if (res.data && res.data.message) {
      refetch(); 
      setAnyRes(res.data.message);
    }
  };

  if (isPostFetch) {
    return (
      <div className='w-full h-screen flex items-center justify-center '>
      <Spinner size={'xl'} />
  </div>    );
  }

  return (
    <div className='w-full overflow-hidden overflow-x-auto p-6'>
      {!isLoading && anyRes && (
        <div className='relative'>
          <Alert color={`${isError ? 'failure' : 'success'}`} className='mt-5'>
            {anyRes}
          </Alert>
          <span
            onClick={() => {
              setAnyRes('');
            }}
            className='absolute top-0 right-3 font-bold cursor-pointer text-teal-900'>
            x
          </span>
        </div>
      )}

      {user.IsAdmin && usersD.length > 0 ? (
        <div className='w-full overflow-hidden overflow-x-auto'>
          <h1 className='w-fit mx-auto mb-5 font-bold text-5xl'>Users</h1>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            {usersD.map((user) => (
              <Table.Body key={user._id} className='divide-y'>
                <Table.Row>
                  <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
           
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-9 rounded-full h-9 object-cover bg-gray-500'
                      /> 
                  </Table.Cell>
                  <Table.Cell> 
                      {user.username} 
                  </Table.Cell>
                  <Table.Cell>{user.IsAdmin ? <FaCheck color='green'/> : <FaXmark color='red' />}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setPostId(user._id);
                        setShowModal(true);
                      }}
                      className='font hover:text-red-600 cursor-pointer'>
                      <FaTrash />
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          <button className='w-fit block mx-auto pt-4 hover:text-teal-500 duration-300'>Show more</button>
        </div>
      ) : (
        <figure className='flex items-center flex-col justify-center h-screen'>
          <img className='md:w-64 w-[50%] object-contain' src={emptyImage} alt='no posts' />
          <p className='font-bold md:text-2xl text-xs sm:text-lg'>No users available yet!</p>
        </figure>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size={'md'}>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineInformationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user?</h3>
            <div className='flex gap-4 justify-center'>
              <Button color='failure' onClick={() => handleDeleteUser()}>
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

export default DashUser;
