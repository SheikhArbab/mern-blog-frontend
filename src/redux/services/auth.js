import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['users'],
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
    user: builder.mutation({
      query: (user) => ({
        url: 'sign-in',
        method: 'POST',
        body: user,
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
        url: `auth/signin/delete/${userId}`,
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
  useUserMutation,
  useGoogleUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useSignoutMutation
} = authApi;