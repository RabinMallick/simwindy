import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import languageReducer from "./slice/languageSlice"; 
import docsReducer from "./slice/docsSlice"; 
import esimReducer from "./slice/esimSlice"; 
import currencyReducer from "./slice/currencySlice"; 

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    language: languageReducer, 
    docs: docsReducer, 
    esim : esimReducer,
    currency : currencyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,),
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
