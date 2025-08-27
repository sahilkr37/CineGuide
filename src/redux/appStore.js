import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import moviesSlice from './moviesSlice'

export const appStore = configureStore(
    {
        reducer: {
            user: userSlice,
            movies: moviesSlice,

        }
    }
)
