import React, { useState } from 'react'
import { Search, X } from "lucide-react";

const SearchBar = () => {
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            console.log("Search clicked:", searchQuery);
            setSearchQuery("");
            setShowSearch(false);
        }
    };
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div>
            {!showSearch && (<div className=" relative">
                <Search
                    className="cursor-pointer hover:text-amber-400 transition"
                    onClick={() => setShowSearch(!showSearch)}
                />
            </div>)}


            {/*Search Bar */}
            {showSearch && (
                < div className="absolute top-15 sm:top-20 left-0 sm:w-2/4  sm:p-10 sm:-translate-x-1/2 sm:left-1/2 w-full p-4 bg-black z-40 transition-all duration-300 ease-in-out sm:rounded-md">
                    <X className='absolute right-3 top-2 cursor-pointer text-red-800 sm:scale-150  transition-all' onClick={() => setShowSearch(false)} />
                    <div className="flex items-center gap-2 border sm:w-[100%] w-[90%] px-3 py-2 sm:p-5 bg-[#393E46] border-white rounded-full">

                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            autoFocus
                            className="bg-transparent focus:outline-none text-white w-full"
                        />

                        <button ><Search className="text-amber-600 shrink-0 cursor-pointer hover:scale-120 transition-all" /></button>
                    </div>


                </div>
            )
            }

        </div >
    )
}

export default SearchBar
