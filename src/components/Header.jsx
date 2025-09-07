import logo from "../assets/logo.svg";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { addUser, removeUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import KeyInput from "./KeyInput";

import { clearAIKey } from "../redux/aiKeySlice";



function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [active, setActive] = useState("Movies");
    const [showKeyInputBox, setShowKeyInputBox] = useState(false);

    const profileRef = useRef(null);

    const user = useSelector((store) => store.user);
    const apiKey = useSelector((store) => store.aiKey.aiKey)
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





    return (
        <>
            <div className="fixed w-full px-2 py-3 flex justify-between sm:px-30 items-center bg-black text-white z-50">
                <img
                    src={logo}
                    alt="CineGuide"
                    className="w-20 sm:w-28 md:w-30 h-auto cursor-pointer"
                />

                {user && (
                    <>
                        <div className="hidden md:flex gap-6 lg:gap-8 text-sm sm:text-base md:text-lg font-semibold">
                            {["Movies", "My List"].map((item) => (
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

                        <div className="flex gap-5 items-center">
                            <SearchBar />
                            {(showKeyInputBox) && <KeyInput showKeyInputBox={showKeyInputBox} setShowKeyInputBox={setShowKeyInputBox} />}

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
                                            onClick={() => navigate("/")}
                                            className="w-full cursor-pointer text-left px-4 py-2 hover:bg-amber-600 transition"
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            onClick={() => setShowKeyInputBox(!showKeyInputBox)}
                                            className="w-full cursor-pointer text-left px-4 py-2 hover:bg-amber-600 transition"
                                        >
                                            Gemini API Key {apiKey ? "✅" : "❌"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                signOut(auth)
                                                    .then(() => {
                                                        dispatch(clearAIKey()); // clear API key after successful logout
                                                        navigate("/"); // redirect to home or login
                                                    })
                                                    .catch(() => navigate("/error"));
                                            }}
                                            className="w-full cursor-pointer text-left px-4 py-2 hover:bg-red-600 transition"
                                        >
                                            Sign Out
                                        </button>

                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div >


        </>
    );
}

export default Header;
