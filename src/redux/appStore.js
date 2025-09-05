import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import moviesSlice from './moviesSlice'
import aiKeySlice from './aiKeySlice'

export const appStore = configureStore(
    {
        reducer: {
            user: userSlice,
            movies: moviesSlice,
            aiKey: aiKeySlice,
        }
    }
)
