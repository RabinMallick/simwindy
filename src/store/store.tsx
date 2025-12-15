import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./api/apiSlice";
import { ipAdressSlice } from "./api/ipAdressSlice";

import languageReducer from "./slice/languageSlice";
import docsReducer from "./slice/docsSlice";
import esimReducer from "./slice/esimSlice";
import checkoutReducer from "./slice/checkoutSlice";
import currencyReducer from "./slice/currencySlice";
import navbarReducer from "./slice/navbarSlice";
import authReducer from "./api/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [ipAdressSlice.reducerPath]: ipAdressSlice.reducer,

    language: languageReducer,
    docs: docsReducer,
    esim: esimReducer,
    checkout: checkoutReducer,
    currency: currencyReducer,
    navbar: navbarReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      ipAdressSlice.middleware
    ),
  devTools: false,
});

setupListeners(store.dispatch);

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
