import React from 'react'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from './HorizontalScrollCard'

function SecondaryContainer() {
  const popularMovies = useSelector((store) => store.movies?.popularMovies)
  console.log(popularMovies)

  return (
    <div className='relative sm:py-10 py-0 sm:ml-20 ml-3 z-10 sm:-mt-120 -mt-35 sm:space-y-20 space-y-5 '>
      <HorizontalScrollCard movies={popularMovies} title={'Popular Movies'} />
      <HorizontalScrollCard movies={popularMovies} title={'Upcoming Movies'} />
      <HorizontalScrollCard movies={popularMovies} title={'Top ones'} />
    </div>
  )
}

export default SecondaryContainer
