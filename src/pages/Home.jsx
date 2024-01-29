import React, { useState } from 'react'
import { CallToAction } from '../components/index'
import { Link } from 'react-router-dom';
import { PostCard } from '../components/index'
import { useGetAllPostsQuery } from '../redux/services/post'

const Home = ({ setProgress }) => {

  const [posts, setPosts] = useState([])

  const { data } = useGetAllPostsQuery()

  React.useEffect(() => {
    setProgress(20)
    setTimeout(() => {

      if (data) {
        setPosts(data.posts)
      }
      setProgress(100)
    }, 400);
  }, [data])



  console.log(data);

  return (
    <div>
      <div className='flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.</p>
        <Link to={'/search'} className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>


      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-2xl font-semibold text-center'>Recent Post</h2>
          <div className='flex flex-wrap gap-4 items-center justify-center'>
            {posts && posts.length > 0 && posts.map(post => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>

          <Link className='text-lg text-teal-500 hover:underline text-center' to={'/search'}>
            View all posts
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home
