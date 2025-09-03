import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: 'movielist',
    initialState: {
        nowPlaying: null,
        popularMovies: null,
        upcomingMovies: null,
        top_rated: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlaying = action.payload
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload
        },
        addTopRated: (state, action) => {
            state.top_rated = action.payload
        },
    }
})
export const { addPopularMovies, addUpcomingMovies, addTopRated, addNowPlayingMovies } = moviesSlice.actions
export default moviesSlice.reducer