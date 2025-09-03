import { useEffect } from 'react'
import { options } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addPopularMovies, addUpcomingMovies, addTopRated, addNowPlayingMovies } from '../redux/moviesSlice'

const useFetchMovies = (type) => {
    const dispatch = useDispatch()

    const getMovies = async () => {
        const url = `https://api.themoviedb.org/3/movie/${type}?page=1`
        const data = await fetch(url, options)
        const json = await data.json()
        if (type === "popular") {
            dispatch(addPopularMovies(json.results));
        } else if (type === "upcoming") {
            dispatch(addUpcomingMovies(json.results));
        } else if (type === "top_rated") {
            dispatch(addTopRated(json.results));
        } else if (type === "now_playing") {
            dispatch(addNowPlayingMovies(json.results));
        }
    }
    // const getGenreMovies = async () => {
    //     const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    //     const data = await fetch(url, options)
    //     const json = await data.json()
    // }
    useEffect(() => {
        getMovies()
        // getGenreMovies()
    }, [])
}

export default useFetchMovies
