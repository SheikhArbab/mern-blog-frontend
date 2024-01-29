import React, { useEffect, useState } from 'react';
import { Comment } from '../components/index';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Link  } from 'react-router-dom';
import { Textarea, Button, Alert, Spinner } from 'flowbite-react';
import {
    useNewCommentMutation,
    useGetCommentsQuery
} from '../redux/services/comment';

const CommentsSection = ({ postId }) => {
    const { user } = useSelector((state) => state.auth); 

    const [newComment, { isLoading, isError }] = useNewCommentMutation(); 
    const { data, refetch } = useGetCommentsQuery(postId);
    const [getComments, setGetComments] = useState([]);

    useEffect(() => {
        if (data) {
            setGetComments(data);
        }
    }, [data]);

    const [anyRes, setAnyRes] = useState('');
    const [coms, setComs] = useState(false);

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
        errors,
        values,
        resetForm
    } = useFormik({
        initialValues: {
            comment: ''
        },
        validationSchema: Yup.object({
            comment: Yup.string()
                .required('Comment is required')
                .min(3, 'Comment must be at least 3 characters')
                .max(1000, 'Comment cannot exceed 1000 characters')
        }),
        onSubmit: async (formValues) => {
            try {
                const res = await newComment({
                    content: formValues.comment,
                    userId: user._id,
                    postId
                });

                if (res.error && res.error.data && res.error.data.message) {
                    setAnyRes(res.error.data.message);
                } else if (res.data && res.data.message) {
                    resetForm();
                    refetch();
                    setAnyRes(res.data.message);
                }
            } catch (error) {
                console.error('Error during comment creation:', error);
            }
        }
    });

 
    return (
        <div className="max-w-2xl mx-auto w-full p-3 ">

            {
                user ? (
                    <div className='flex items-center gap-1 my-5 text-gray-500 text-sm '>
                        <p>Signed in as:</p>
                        <Link className='text-xs text-cyan-600 hover:underline flex gap-1 items-center' to={'/dashboard?tab=profile'}>
                            <img className='object-cover rounded-full w-5 h-5' src={user.profilePicture} alt="" />
                            @{user.username}
                        </Link>
                    </div>
                ) : (
                    <div className='text-sm text-teal-500 my-5 flex gap-1'>
                        You must be signed in to comment. {' '}
                        <Link className='text-blue-500 hover:underline' to={'/sign-in'}>Sign In</Link>
                    </div>
                )
            }
            {
                !isLoading && anyRes &&
                <div className='relative mb-5'>
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

            {user && (

                <form className='border border-teal-500 rounded-md p-3 ' onSubmit={handleSubmit}>
                    <Textarea
                        name='comment'
                        id='comment'
                        placeholder='Add a comment...'
                        rows={'3'}
                        maxLength={'1000'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment}
                    />
                    {errors.comment && touched.comment ? <span className='text-red-600 text-xs  '>{errors.comment}</span> : null}
                    <div className='flex justify-between items-center mt-5 '>
                        <p className='text-gray-500 text-xs'>1000 characters remaining</p>
                        <Button disabled={isLoading} outline gradientDuoTone={'purpleToBlue'} className={`w-32 h-10 ${isLoading && 'opacity-60 cursor-not-allowed'}`} type='submit'>
                            {isLoading ? <Spinner color={'purple'} /> : "Submit"}

                        </Button>
                    </div>
                </form>

            )}
            <Button
                onClick={() => {
                    refetch()
                    setComs(!coms)
                }}
                className='mx-auto mt-5'
                outline
                gradientDuoTone={'purpleToBlue'}>{coms ? "Hide comments" : "Show comments"}</Button>
            {
                coms &&

                <div>
                    {getComments.length === 0 ? (
                        <p className='text-sm my-5'>No comments yet!</p>
                    ) : (
                        <>
                            <div className='text-sm my-5 flex items-center gap-1'>
                                <p>Comments</p>
                                <div className='border border-gray-400 py-1 px-2 rounded-md'>
                                    <p>{getComments.length}</p>
                                </div>
                            </div>
                            {getComments.map(comment => (
                                <Comment  comment={comment} key={comment._id} currentUser={user} />
                            ))}
                        </>
                    )}
                </div>

            }
        </div>
    )
}

export default CommentsSection
