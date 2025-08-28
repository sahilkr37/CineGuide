import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Heart } from 'lucide-react';

function MainContainerDetails({ mainMovieId }) {
    const popularMovies = useSelector((store) => store.movies?.popularMovies)
    const mainMovie = popularMovies?.find((one) => one.id === mainMovieId)

    const [liked, setLiked] = useState(false);

    if (!mainMovie) return null

    return (
        <div className="absolute top-1/3 sm:left-20 left-2 z-20 text-white max-w-xs sm:max-w-xl pointer-events-none">
            {/* Title */}
            <h1 className="text-lg sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg leading-tight">
                {mainMovie.title}
            </h1>

            {/* Overview */}
            <p className="mt-3 text-xs sm:text-base md:text-lg text-gray-200 line-clamp-3">
                {mainMovie.overview}
            </p>

            {/* Buttons */}
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4 pointer-events-auto">
                <button className="bg-white cursor-pointer text-black px-2 sm:px-6 py-1 sm:py-2 rounded-md text-xs sm:text-base font-semibold hover:bg-gray-200">
                    ▶ Play Trailer
                </button>
                <button
                    onClick={() => setLiked(!liked)}
                    className="bg-gray-700 cursor-pointer bg-opacity-70 text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-600 flex items-center justify-center"
                >
                    <Heart
                        className={`w-5 h-5 sm:w-10 sm:h-10 transition-all duration-200 ease-in-out transform ${liked
                            ? "fill-amber-600 text-amber-600 scale-125"
                            : "fill-transparent text-white scale-100"
                            }`}
                    />
                </button>
            </div>
        </div>
    )
}

export default MainContainerDetails
