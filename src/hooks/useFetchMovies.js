import { useEffect } from 'react'
import { options } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addPopularMovies, addUpcomingMovies, addTopRated, addNowPlayingMovies, addGenre, addMoviesByGenre } from '../redux/moviesSlice'
import { useSelector } from 'react-redux'

const useFetchMovies = (type) => {
    const dispatch = useDispatch()
    const genres = useSelector((store) => store.movies?.genre);
    const popularMovies = useSelector((store) => store.movies?.popularMovies);
    const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);
    const topRated = useSelector((store) => store.movies?.topRated);
    const nowPlaying = useSelector((store) => store.movies?.nowPlaying);
    const moviesByGenre = useSelector((store) => store.movies?.moviesByGenre || {});
    // console.log(genre)

    const getMovies = async () => {

        if ((type === "popular" && Array.isArray(popularMovies) && popularMovies.length) ||
            (type === "upcoming" && Array.isArray(upcomingMovies) && upcomingMovies.length) ||
            (type === "top_rated" && Array.isArray(topRated) && topRated.length) ||
            (type === "now_playing" && Array.isArray(nowPlaying) && nowPlaying.length)) {
            console.log(`Using cached ${type} movies from Redux store`);
            return;
        }

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

        if (genres.length > 0) {
            console.log("Using cached genres from Redux store");
            return;
        }


        const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
        const data = await fetch(url, options)
        const json = await data.json()
        dispatch(addGenre(json.genres))

    }
    const fetchAllGenresMovies = async () => {
        if (!genres || genres.length === 0) return;
        for (let g of genres) {

            if (moviesByGenre[g.id]) {
                console.log(`Using cached movies for genre ${g.name} from Redux store`);
                continue;
            }

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
