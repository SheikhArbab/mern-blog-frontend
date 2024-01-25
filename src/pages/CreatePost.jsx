import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextInput, Select, FileInput, Button } from 'flowbite-react';
import { useCreatePostMutation } from '../redux/services/post'
import { useSelector } from 'react-redux';

const CreatePost = () => {



    const [createPost, { isLoading }] = useCreatePostMutation()

    const { user } = useSelector(state => state.auth)

    const { handleChange, handleSubmit, handleBlur, touched, errors, values, resetForm, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            image: null,
            content: '',
            category: 'uncategorized',
            userId: user._id
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            category: Yup.string().notOneOf(['uncategorized'], 'Please select a category'),
        }),
        onSubmit: async (formValues) => {
            console.log(formValues);
            try {

                const res = await createPost(formValues)
                console.log(res);

            } catch (error) {
                console.error('Error during post creation:', error);
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
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a new post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        id='title'
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='flex-1'
                    />
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
                </div>

                <div className='flex gap-4 h-36r items-center justify-center flex-col border-4 border-teal-500 border-dotted p-3 '>
                    <FileInput type='file' accept='image/*' onChange={handleFileChange} className='w-full' />
                    {values.image &&
                        <img className='h-full  object-contain' src={values.image} />}

                </div>

                <ReactQuill
                    theme='snow'
                    id='textarea'
                    value={values.content}
                    onChange={handleQuillChange}
                    placeholder='Write something...'
                    className='h-72 mb-12'
                />

                <Button type='submit' gradientDuoTone={'purpleToPink'}>
                    Publish
                </Button>
            </form>
        </div>
    );
};

export default CreatePost;
