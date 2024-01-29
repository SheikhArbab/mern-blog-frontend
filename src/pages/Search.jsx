import React, { useEffect, useState } from 'react';
import { Spinner, TextInput } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import { useFilterGetAllPostsQuery } from '../redux/services/post';
import { PostCard } from '../components/index';

const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        // category: ,
    });

    const [postData, setPostData] = useState([]);
    const location = useLocation();
    const { data, isLoading, isError } = useFilterGetAllPostsQuery(sidebarData);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const categoryFromUrl = urlParams.get('category');

        if (data) {
            setPostData(data.posts);
        }

        if (searchTermFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                // category: categoryFromUrl
            });
        }
    }, [location.search, data]);

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: value });
        }
        // Uncomment this block if you also want to handle category changes
        // if (id === 'category') {
        //     setSidebarData({ ...sidebarData, category: value });
        // }
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            {isLoading && <Spinner size={'xl'} />}
            <div className='flex flex-col md:flow-row'>
                <div className='md:min-h-screen'>
                    <div className='flex flex-wrap items-center justify-center gap-5 py-5'>
                        {!isLoading &&
                            postData &&
                            postData.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
