import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
    return (
        <Link to={`/post/${post.slug}`}>
            <div className='w-72 h-72 rounded-md overflow-hidden hover:shadow-md border-2 border-purple-200 duration-300 transition-all hover:shadow-purple-800'>
                <figure className='w-full h-52 bg-red-500'>
                    <img className='w-full h-full object-cover' src={post.image} alt="post" />
                </figure>
                <div className='px-3'>
                    <h1 className='font-semibold text-2xl'>{post.title}</h1>
                    <span className='text-xs text-gray-500'>{post.category}</span>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
