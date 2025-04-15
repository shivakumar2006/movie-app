import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../app/ThemeSlice";
import { tmdb } from "../app/apiSLice";
import authReducer from "../features/authSlice";

export const store = configureStore({
    reducer: {
         theme: themeReducer,
         auth: authReducer,
         [tmdb.reducerPath]: tmdb.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(tmdb.middleware), 
})

export default store;


