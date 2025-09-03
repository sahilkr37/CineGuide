import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: 'movielist',
    initialState: {
        nowPlaying: null,
        popularMovies: null,
        upcomingMovies: null,
        top_rated: null,
        genre: [],
        moviesByGenre: {},
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
        addGenre: (state, action) => {
            state.genre = action.payload
        },
        addMoviesByGenre: (state, action) => {
            const { genreId, movies } = action.payload;
            state.moviesByGenre[genreId] = movies;
        },
    }
})
export const { addPopularMovies, addUpcomingMovies, addTopRated, addNowPlayingMovies, addGenre, addMoviesByGenre } = moviesSlice.actions
export default moviesSlice.reducer