import React, { useState } from 'react'
import { Search, X } from "lucide-react";
import useAiSearch from '../hooks/useAiSearch';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from './HorizontalScrollCard';
import SearchIconComponent from './SearchIconComponent';
import LoadingSpinner from './LoadingSpinner'


const SearchBar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { searchMovies, loading } = useAiSearch();
    const searchResult = useSelector((store) => store.aiKey.searchResult)


    const handleSearch = (e) => {
        if (e.key === "Enter") {
            searchMovies(searchQuery)
        }
    };

    return (
        <div>
            {!showSearch && (<div className=" relative" onClick={() => setShowSearch(!showSearch)} >
                <SearchIconComponent />
            </div>)}


            {/*Search Bar */}
            {showSearch && (
                < div className="absolute top-15 sm:top-20 left-0 sm:w-2/4 sm:p-20 sm:-translate-x-1/2 sm:left-1/2 w-full p-4 bg-black/90 z-40 transition-all duration-300 ease-in-out sm:rounded-md h-[100vh] overflow-y-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-lg sm:text-4xl font-bold text-white mb-2">
                            Your AI Cinema Guide
                        </h1>
                        <p className="text-gray-300 text-sm sm:text-lg">
                            Enter your mood, favorite actor, or movie type, and our AI will suggest 10 movies just for you!
                        </p>
                    </div>

                    {/* Mood / Genre Quick Buttons */}
                    <div className="flex flex-wrap gap-1 sm:gap-3 justify-center mb-6">
                        {['Shahrukh Khan Romantic', 'Indian College Life', 'School Love Story', 'Old Hindi Classics', 'Patriotic Movie', 'Sports Drama',].map((mood) => (
                            <button
                                key={mood}
                                onClick={() => {
                                    setSearchQuery(mood);
                                    searchMovies(mood);
                                }}
                                className="bg-amber-600 hover:bg-amber-800 cursor-pointer text-white text-sm px-4 py-2 rounded-full transition-all"
                            >
                                {mood}
                            </button>
                        ))}
                    </div>

                    <X className='absolute right-3 top-4 cursor-pointer text-red-800 scale-150 transition-all' onClick={() => setShowSearch(false)} />
                    <div className="flex items-center mt-7 gap-2 border   px-3 py-2 sm:p-5 bg-[#393E46] border-white rounded-full">

                        <input
                            type="text"
                            placeholder="Enter mood or movie (e.g., 'romantic Shahrukh', 'old horror')"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            autoFocus
                            className="bg-transparent focus:outline-none text-white w-[100%]"
                        />

                        <button disabled={loading} onClick={() => {
                            searchMovies(searchQuery)
                        }}>{loading ? <LoadingSpinner /> : <Search className="text-amber-600 shrink-0 cursor-pointer hover:scale-120 transition-all" />}</button>
                    </div>

                    <div className='mt-10'>
                        {searchResult && (
                            <HorizontalScrollCard movies={searchResult} title={'Results: '} />
                        )}
                    </div>

                </div>
            )
            }

        </div >
    )
}

export default SearchBar
