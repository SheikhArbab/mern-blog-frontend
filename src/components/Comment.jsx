import React, { useEffect, useState } from 'react'
import { useGetUserByIdQuery } from '../redux/services/auth'
import { Spinner } from 'flowbite-react';
import { FaTrash } from "react-icons/fa";
import moment from 'moment'

const Comment = ({ comment, currentUser }) => {

    const [user, setUser] = useState(null)



    const { data, isLoading } = useGetUserByIdQuery(comment.userId)

    useEffect(() => {

        if (data) {
            const getUser = async () => {
                try {
                    setUser(data?.rest)
                } catch (error) {
                    console.log(error);
                }
            }
            getUser()
        }
    }, [comment])
    if (isLoading) {
        return <div className='w-full flex items-center justify-center'><Spinner size={'xs'} /></div>
    }

    return (

        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <figure className='flex shrink-0 mr-3 '>
                <img
                    className='w-7 h-7 rounded-full bg-gray-200'
                    src={user && user.profilePicture} alt="user" />
            </figure>
            <div>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>
                        {user ? `@${user.username}` : 'anonymous user'}
                    </span>
                    <div>
                        <span className='text-gray-500 text-xs'>
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                </div>
                <p className='text-gray-500 pb-2 block '>{comment && comment.content}</p>

                {
                    currentUser && <span
                        className='text-gray-400 hover:text-red-500 cursor-pointer'>
                        <FaTrash className='text-sm' />
                    </span>
                }
            </div>
        </div>
    )
}

export default Comment
