import logo from "../assets/logo.svg";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { addUser, removeUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { Search } from "lucide-react";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [active, setActive] = useState("Movies"); // Movies is active by default

    const profileRef = useRef(null);
    const searchRef = useRef(null);

    const user = useSelector((store) => store.user);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // console.log("Auth state changed:", user); 
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        // Unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    // Close dropdown & search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            console.log("Search clicked:", searchQuery);
            setSearchQuery("");
            setShowSearch(false);
        }
    };

    return (
        <>
            <div className="fixed w-full px-2 py-3 flex justify-between sm:px-30 items-center bg-black text-white z-50">
                {/* Logo always visible */}
                <img
                    src={logo}
                    alt="CineGuide"
                    className="w-20 sm:w-28 md:w-30 h-auto cursor-pointer"
                />

                {/* Show rest of navbar only if user logged in */}
                {user && (
                    <>
                        {/* Center: Nav Items */}
                        <div className="hidden md:flex gap-6 lg:gap-8 text-sm sm:text-base md:text-lg font-semibold">
                            {["Movies", "TV Shows", "My List"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setActive(item)}
                                    className={`pb-1 transition duration-300 ${active === item
                                        ? "text-white border-b-2 border-amber-600"
                                        : "hover:text-amber-400 text-gray-300"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {/* Right: Search + Profile */}
                        <div className="flex gap-5 items-center">
                            {/* Desktop Search */}
                            <div ref={searchRef} className="hidden md:block relative">
                                <Search
                                    className={`cursor-pointer hover:text-amber-400 transition ${showSearch ? "opacity-0 pointer-events-none" : "opacity-100"
                                        }`}
                                    onClick={() => setShowSearch(true)}
                                />
                            </div>

                            {/* Mobile Search Button */}
                            <div className="md:hidden">
                                <Search
                                    className="cursor-pointer hover:text-amber-400 transition"
                                    onClick={() => setShowSearch(!showSearch)}
                                />
                            </div>

                            {/* Mobile Search Bar */}
                            {showSearch && (
                                <div className="absolute top-16 sm:top-20 left-0 sm:w-2/4 sm:p-10 sm:-translate-x-1/2 sm:left-1/2 w-full p-4 bg-black z-40 transition-all duration-300 ease-in-out sm:rounded-md">
                                    <div className="flex items-center gap-2 border px-3 py-2 sm:p-5 bg-[#393E46] border-white rounded-full">
                                        <Search className="text-amber-600 shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={handleSearch}
                                            autoFocus
                                            className="bg-transparent focus:outline-none text-white w-full"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Profile Dropdown */}
                            <div className="relative" ref={profileRef}>
                                <img
                                    src={user.photoURL || "/default-avatar.png"}
                                    alt="profile"
                                    className="w-8 sm:w-12 h-8 sm:h-12 rounded-full cursor-pointer"
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                />

                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-black text-white rounded-lg shadow-lg border border-amber-600 overflow-hidden">
                                        <button
                                            onClick={() => navigate("/profile")}
                                            className="w-full text-left px-4 py-2 hover:bg-amber-600 transition"
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            onClick={() => navigate("/settings")}
                                            className="w-full text-left px-4 py-2 hover:bg-amber-600 transition"
                                        >
                                            Settings
                                        </button>
                                        <button
                                            onClick={() => {
                                                signOut(auth)
                                                    .then(() => { })
                                                    .catch(() => navigate("/error"));
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-red-600 transition"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>


        </>
    );
}

export default Header;
