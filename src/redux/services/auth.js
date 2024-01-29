import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['users'],
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
    user: builder.mutation({
      query: (user) => ({
        url: 'sign-in',
        method: 'POST',
        body: user,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `getusers`,
        method: 'GET',
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `getusers/${id}`,
        method: 'GET',
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: 'sign-out',
        method: 'GET',
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => {
        return {
          url: `sign-up`,
          method: 'POST',
          body: newUser,
        };
      },
      invalidatesTags: ['users'],
    }),

    updateUser: builder.mutation({
      query: ({ userId, updateData }) => {

        return {
          url: `update/${userId}`,
          method: 'PUT',
          body: updateData,
        };
      },
      invalidatesTags: ['users'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `delete/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
    googleUser: builder.mutation({
      query: (googleUser) => ({
        url: 'google',
        method: 'POST',
        body: googleUser,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation, 
  useGoogleUserMutation,
  useUserMutation,
  useSignoutMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery
} = authApi;