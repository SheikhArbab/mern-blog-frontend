import React, { useEffect, useState } from 'react';
import { useGetPostsQuery } from '../redux/services/post';
import { FaTrash,FaRegEdit } from "react-icons/fa";
import { Table } from 'flowbite-react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashPosts = () => {
  const { user } = useSelector(state => state.auth);
  const { data } = useGetPostsQuery({ userId: user._id });
  const [userPosts, setUserPosts] = useState([]);



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

  return (
    <div>
      {user.IsAdmin && userPosts.length > 0 ? (

        <Table hoverable className='shadow-md'>

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
              <Table.Body key={post._id}>
                <Table.Row>

                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className='w-20 h-20 object-cover bg-gray-500' />
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>

                  <Table.Cell>
                    <span className='font hover:text-red-600 cursor-pointer'><FaTrash /></span>
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

      ) : (
        <p>No posts available for the user.</p>
      )}
    </div>
  );
};

export default DashPosts;
