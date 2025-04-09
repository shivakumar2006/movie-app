import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../app/ThemeSlice";
import { tmdb } from "../app/apiSLice";

export const store = configureStore({
    reducer: {
         theme: themeReducer,
         [tmdb.reducerPath]: tmdb.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(tmdb.middleware), 
})

export default store;


