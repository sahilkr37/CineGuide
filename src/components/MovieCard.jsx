import React, { useState } from 'react'
import { Heart, Play } from 'lucide-react'


const MovieCard = ({ path, movieName }) => {
    const [showOverlay, setShowOverlay] = useState(false)
    const [liked, setLiked] = useState(false);
    const handleToggle = () => {
        if (window.innerWidth < 640) {
            setShowOverlay(!showOverlay);
        }
    }
    return (

        <div className="relative shrink-0 group cursor-pointer " onClick={handleToggle}>
            {/* Movie Image */}
            <img
                className="sm:w-55 w-25 md:w-45 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                src={`https://image.tmdb.org/t/p/w200/${path}`}
                alt={movieName}
            />

            {/* Overlay on hover */}
            <div
                className={`absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center transition-opacity duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[98%] w-[98%]
          ${showOverlay ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"}`}
            >

                <h3 className="text-white text-xs sm:text-sm font-semibold mb-2 text-center px-2">
                    {movieName}
                </h3>
                <div className="flex justify-center items-center gap-2">
                    <a href="https://youtu.be/2ZhB-YO5Tnk?list=TLGGqFgGHjojeCEwMzA5MjAyNQ" onClick={(e) => e.stopPropogation()} target="_blank" className='bg-white cursor-pointer bg-opacity-70 text-black p-1 sm:p-2 rounded-lg   hover:bg-white/80 flex items-center justify-center'>
                        <Play className='sm:w-5 sm:h-5 w-4 h-4 transition-all duration-200 ease-in-out transform' />
                    </a>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setLiked(!liked)
                        }}
                        className="bg-gray-700  cursor-pointer  text-white p-1 sm:p-2 rounded-lg  hover:bg-gray-600 flex items-center justify-center"
                    >
                        <Heart
                            className={`sm:w-5 sm:h-5 w-4 h-4 transition-all duration-200 ease-in-out transform ${liked
                                ? "fill-amber-600 text-amber-600 "
                                : "fill-transparent text-white "
                                }`}
                        />
                    </button>

                </div>
            </div >

        </div >

    )
}

export default MovieCard
