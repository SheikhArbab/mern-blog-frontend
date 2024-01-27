import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'http://localhost:4000/';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: (headers) => {
      const newHeaders = new Headers(headers);
      newHeaders.set('Content-Type', 'application/json');
      return newHeaders;
    },
  }),
  endpoints: (builder) => ({
    getPostById: builder.query({
      query: (id) => ({
        url: `get/post/${id}`,
        method: 'GET'
      }),
      invalidatesTags: ['posts'],
    }),
    getPosts: builder.query({
      query: ({ userId }) => ({
        url: `get/posts?userId=${userId}`,
        method: 'GET'
      }),
      invalidatesTags: ['posts'],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: 'create/post',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['posts'],
    }),

    updatePost: builder.mutation({
      query: ({ userId, updateData }) => {
        // Log statement before sending the update request
        console.log(`Updating post for user ${userId} with data:`, updateData);
    
        return {
          url: `update/post/${userId}`,
          method: 'PUT',
          body: updateData,
        };
      }, 
    }),
    


    deletePost: builder.mutation({
      query: (id) => ({
        url: `delete/post/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery
} = postsApi;