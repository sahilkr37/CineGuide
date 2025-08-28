import { useEffect } from 'react'
import { options } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addPopularMovies, addUpcomingMovies } from '../redux/moviesSlice'

const usePopularMovies = () => {
    const dispatch = useDispatch()

    const getMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', options)
        const json = await data.json()
        console.log(json)
        dispatch(addPopularMovies(json.results))
    }
    useEffect(() => {
        getMovies()
    }, [])
}

export default usePopularMovies
