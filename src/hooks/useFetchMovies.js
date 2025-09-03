import { useEffect } from 'react'
import { options } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addPopularMovies, addUpcomingMovies, addTopRated, addNowPlayingMovies, addGenre, addMoviesByGenre } from '../redux/moviesSlice'
import { useSelector } from 'react-redux'

const useFetchMovies = (type) => {
    const dispatch = useDispatch()
    const genres = useSelector((store) => store.movies?.genre || []);
    // console.log(genre)

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
    const getGenre = async () => {
        const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
        const data = await fetch(url, options)
        const json = await data.json()
        dispatch(addGenre(json.genres))

    }
    const fetchAllGenresMovies = async () => {
        if (!genres || genres.length === 0) return;
        for (let g of genres) {
            const data = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${g.id}&api_key=YOUR_KEY`, options)
            const json = await data.json()
            // console.log(json.results)
            dispatch(addMoviesByGenre({ genreId: g.id, movies: json.results }))
        }
    }

    useEffect(() => {
        getMovies()
        getGenre()
    }, [])
    useEffect(() => {
        if (genres.length > 0) {
            fetchAllGenresMovies()
        }
    }, [genres])
}

export default useFetchMovies
