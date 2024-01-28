import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPostBySlugQuery } from '../redux/services/post';
import { Spinner, Button } from 'flowbite-react';
import { CallToAction,CommentsSection } from '../components/index'

const Post = ({ setProgress }) => {
    useEffect(() => {
        document.title = 'Post | MERN - Blogger';
        setProgress(20);

        setTimeout(() => {
            setProgress(100);
        }, 400);
    }, []);

    const { slug } = useParams();
    const { data, isLoading, isError, isFetching } = useGetPostBySlugQuery(slug);
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (data && data.posts) {
            setPost(data.posts[0]);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className='w-full h-screen flex items-center justify-center '>
                <Spinner size={'xl'} />
            </div>
        );
    }

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>

            <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
                <Button color='gray' pill size={'xs'}>
                    {post && post.category}
                </Button>
            </Link>

            <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-contain' />

            <div className='flex items-center justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>


            <div
                className='p-3 max-w-2xl mx-auto w-full post-content'
                dangerouslySetInnerHTML={{ __html: post && post.content }} />

           <div className='max-w-2xl mx-auto w-full '>
           <CallToAction />
           </div>
           <CommentsSection postId={post?._id} />
        </main>
    );
};

export default Post;
