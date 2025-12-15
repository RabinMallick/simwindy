// api/ipAdressSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ipAdressSlice = createApi({
  reducerPath: "ipApi", // 👈 এখানে পরিবর্তন
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["IP"],
  endpoints: (builder) => ({
    getIP: builder.query<any, void>({
      query: () => "https://ipwho.is/",
    }),
  }),
});

export const { useGetIPQuery } = ipAdressSlice;
