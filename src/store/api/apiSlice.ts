import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// baseURL environment থেকে নিবে
const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || 
  'https://apiv2.ticketlagbe.com/core';

export const apiSlice = createApi({
  reducerPath: 'api', // slice name
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // token থাকলে সেট করা
      const token =
        (getState() as any).auth?.token ??
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZTNkNzg0Ni1jOTRjLTQxNzEtOTdkZi00YmRiYjRmYTRiMzgiLCJ0b2tlbiI6MSwiZW1haWwiOiJhcHVyYm9rYUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IkFwdXJibyBLdW1hciAtIiwiY29tcGFueU5hbWUiOiJBaXJib3JuZSBFeHBlZGl0aW9ucyIsInBob25lIjoiODgwMTczMjk1NTkzNyIsImN1cnJlbmN5IjoiQkRUIiwicm9sZSI6IkFHRU5UIiwiaWF0IjoxNzY1NzAwNzI1LCJleHAiOjE3NjYzMDU1MjV9.Ais43uxU8Q74Ko_lwW4gz2AebvtWHq5hiHJByZf3P3k';
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Booking', 'Hotel', 'Sim'], // cache invalidation এর জন্য
  endpoints: (builder) => ({
    // Example: get current user
    getUser: builder.query({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),

    // Example: login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    country: builder.query({
      query: () => 'mobileDataSim/getEsimCountryList',
      providesTags: ['User'],
    }),

    getEsims: builder.mutation({
      query: (body) => ({
        url: `mobileDataSim/packages`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Sim'],
    }),
  }),
});

// hooks auto-generate হবে
export const { useGetUserQuery, useLoginMutation, useCountryQuery, useGetEsimsMutation } =
  apiSlice;
