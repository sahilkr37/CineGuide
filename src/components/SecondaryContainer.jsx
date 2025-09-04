import React from 'react'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from './HorizontalScrollCard'

function SecondaryContainer() {
  const now_playing = useSelector((store) => store.movies?.nowPlaying)
  const popularMovies = useSelector((store) => store.movies?.popularMovies)
  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies)
  const top_rated = useSelector((store) => store.movies?.top_rated)
  const genres = useSelector((store) => store.movies?.genre)
  const moviesByGenres = useSelector((store) => store.movies.moviesByGenre)



  return (
    <div className='relative sm:py-10 py-0 sm:ml-20 ml-3 z-10 sm:-mt-100 md:-mt-70 -mt-35 sm:space-y-20 space-y-5 bg-transparent'>
      <HorizontalScrollCard movies={now_playing} title={'Now Playing'} />
      <HorizontalScrollCard movies={popularMovies} title={'Popular Movies'} />
      <HorizontalScrollCard movies={upcomingMovies} title={'Upcoming Movies'} />
      <HorizontalScrollCard movies={top_rated} title={'Top Rated'} />
      {
        genres.map((g) => {
          const movies = moviesByGenres[g.id]
          return (
            <HorizontalScrollCard id={g.id} movies={movies} title={g.name} />
          )
        })
      }

    </div>
  )
}

export default SecondaryContainer
