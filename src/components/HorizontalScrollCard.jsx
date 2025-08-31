import React from 'react'

function HorizontalScrollCard({ movies, title }) {
    return (
        <div>
            <h2 className=" text-white sm:text-4xl text-lg font-bold sm:mb-5 mb-2">{title}</h2>
            <div className='flex overflow-x-scroll scrollbar-hide gap-5 '>
                {movies?.map((movie) => (
                    <div key={movie.id} className='shrink-0'>
                        <img className='sm:w-55 w-25 object-contain rounded-lg' src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="movie" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HorizontalScrollCard
