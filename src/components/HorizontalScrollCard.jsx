import { useRef } from 'react'
import MovieCard from './MovieCard'
import { ChevronRight } from 'lucide-react';

function HorizontalScrollCard({ movies, title }) {
    const scrollRef = useRef(null)

    const handleScroll = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div>
            <h2 className=" text-white sm:text-4xl text-lg font-bold sm:mb-5 mb-2 md:text-2xl">{title}</h2>
            <div className='flex relative '>
                <div className=' flex overflow-x-scroll scrollbar-hide gap-5 ' ref={scrollRef}>
                    {movies?.map((movie) => (
                        <MovieCard key={movie.id} movieId={movie.id} path={movie.poster_path} movieName={movie.title} />
                    ))}
                </div>
                <ChevronRight onClick={handleScroll} className='absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 bg-black/60 text-white rounded-full p-0  hover:bg-black/80 sm:w-14 sm:h-14 w-10 h-10 ' />
            </div>
        </div >
    )
}

export default HorizontalScrollCard
