import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mern-blog-server-ten.vercel.app/',
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({userId}) => ({
        url: `get/posts?userId=${userId}`,
        method: 'GET' 
      }),
      invalidatesTags: ['posts'],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: `create/post`,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['posts'],
    }),

    updatePost: builder.mutation({
      query: ({ userId, updateData }) => ({
        url: `update/post/${userId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['posts'],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `delete/post/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});

export const { useGetPostsQuery , useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApi;
