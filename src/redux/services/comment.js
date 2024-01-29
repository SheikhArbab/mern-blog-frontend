import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentApi = createApi({
    reducerPath: 'commentApi',
    tagTypes: ['comments'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
        // baseUrl: 'https://mern-blog-server-ten.vercel.app/',
        credentials: 'include',
        mode: 'cors',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({

        newComment: builder.mutation({
            query: ({ content, userId, postId }) => {
                return {
                    url: `new/comment`,
                    method: 'POST',
                    body: { content, userId, postId },
                };
            },
        }),

        getComments: builder.query({
            query: (postId) => {
                return {
                    url: `get/comments/${postId}`,
                    method: 'GET',
                };
            },
        }),

 

    }),
});

export const {
    useNewCommentMutation,
    useGetCommentsQuery, 
} = commentApi;