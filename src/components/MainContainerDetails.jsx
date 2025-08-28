import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Heart } from 'lucide-react';

function MainContainerDetails({ mainMovieId }) {
    const popularMovies = useSelector((store) => store.movies?.popularMovies)
    const mainMovie = popularMovies?.find((one) => one.id === mainMovieId)

    const [liked, setLiked] = useState(false);

    if (!mainMovie) return null

    return (
        <div className="absolute top-1/3 left-20 z-20 text-white max-w-xl pointer-events-none">
            <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
                {mainMovie.title}
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-gray-200 line-clamp-3">
                {mainMovie.overview}
            </p>
            <div className="mt-6 flex gap-4 pointer-events-auto">
                <button className="bg-white cursor-pointer text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200">
                    ▶ Play Trailer
                </button>
                <button onClick={() => setLiked(!liked)} className="bg-gray-700 cursor-pointer bg-opacity-70 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600">
                    <Heart
                        className={`  w-10 h-10 transition-all duration-100 ease-in-out transform ${liked
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
