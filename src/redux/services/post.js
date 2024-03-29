import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseURL = 'http://localhost:4000/';
const baseURL = 'https://mern-blog-server-ten.vercel.app/';

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
    getPostBySlug: builder.query({
      query: (slug) => ({
        url: `get/posts/?slug=${slug}`,
        method: 'GET'
      }),
      invalidatesTags: ['posts'],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `get/post/${id}`,
        method: 'GET'
      }),
      invalidatesTags: ['posts'],
    }),
    getPosts: builder.query({
      query: () => ({
        url: `get/posts`,
        method: 'GET'
      }), 
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: `get/posts`,
        method: 'GET'
      }), 
    }),
    filterGetAllPosts: builder.query({
      query: ({ searchTerm, category }) => ({
        url: `get/posts?searchTerm=${searchTerm}&${category && 'category=' + category}`,

        method: 'GET'
      }), 
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
  useGetPostByIdQuery,
  useGetPostBySlugQuery,
  useGetAllPostsQuery,
  useFilterGetAllPostsQuery
} = postsApi;
