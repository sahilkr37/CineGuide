import React from 'react'
import MovieCard from './MovieCard'
function HorizontalScrollCard({ movies, title }) {
    console.log(movies)
    return (
        <div>
            <h2 className=" text-white sm:text-4xl text-lg font-bold sm:mb-5 mb-2 md:text-2xl">{title}</h2>
            <div className='flex overflow-x-scroll scrollbar-hide gap-5 '>
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} path={movie.poster_path} movieName={movie.title} />
                ))}
            </div>
        </div >
    )
}

export default HorizontalScrollCard
