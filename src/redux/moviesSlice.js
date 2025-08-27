import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: 'movielist',
    initialState: {
        popularMovies: null,
        upcomingMovies: null,
    },
    reducers: {
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload
        },

    }
})
export const { addPopularMovies, addUpcomingMovies } = moviesSlice.actions
export default moviesSlice.reducer