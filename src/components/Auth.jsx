import { useState, useRef } from "react";
import Header from "./Header";
import { Link } from "react-router";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"

import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

import { FcGoogle } from "react-icons/fc";


export default function Auth({ mode = "login" }) {
    const isLogin = mode === "login";
    const [Emailerror, setEmailError] = useState("");
    const [Passerror, setPassError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();


    const name = useRef(null)




    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!emailRegex.test(email)) {
            setEmailError("Pleaese enter a valid Email address")
            valid = false
        } else setEmailError("")

        if (!passwordRegex.test(password)) {
            setPassError("Use a strong password with minimum 8 characters. Must include 1 uppercase, 1 lowercase, 1 digit, 1 special character.");
            valid = false
        } else setPassError("")

        if (valid) {
            alert(isLogin ? "Logging in..." : "Signing up...");
            isLogin ? signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setPassError(errorMessage)
                })
                : createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        updateProfile(user, {
                            displayName: name.current.value,
                            photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.current.value)}&background=3b38a0&color=fff`
                        })
                            .then(() => {
                                const { uid, email, displayName, photoURL } = auth.currentUser;
                                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL, }))
                            })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setPassError(errorMessage)

                    })

        }
    }


    return (
        <div className="relative min-h-screen w-full bg-black text-white">
            <div className="absolute inset-0 hidden sm:block">
                <img
                    src="https://m.media-amazon.com/images/G/31/AmazonVideo/2021/X-site/MLP/TVOD/TVOD_MLP_Right.jpg"
                    alt="background"
                    className="w-full h-full object-cover sm:displa"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <Header />

            <div className="relative flex items-center px-4 sm:px-6 md:px-10 min-h-screen">
                <div className="bg-black/80 p-6 sm:p-8 md:p-10 rounded-md w-full max-w-md md:max-w-lg">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">{isLogin ? "Sign In" : "Sign Up"}</h1>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {!isLogin && (<input
                            ref={name}
                            type="text"
                            placeholder="Enter Name"
                            className="p-3 rounded bg-neutral-800 border border-neutral-700 focus:outline-none  focus:border-white focus:scale-105 transition duration-300 ease-in-out shadow-sm focus:shadow-white/20"
                        />)}
                        <input
                            type="text"
                            placeholder="Email or mobile number"
                            className="p-3 rounded bg-neutral-800 border border-neutral-700 focus:outline-none  focus:border-white focus:scale-105 transition duration-300 ease-in-out shadow-sm focus:shadow-white/20"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        {Emailerror && <p className="text-red-500 text-sm">{Emailerror}</p>}
                        <input
                            type="password"
                            placeholder="Password"
                            className="p-3 rounded bg-neutral-800 border border-neutral-700 focus:outline-none  focus:border-white focus:scale-105 transition duration-300 ease-in-out shadow-sm focus:shadow-white/20"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        {Passerror && <p className="text-red-500 text-sm">{Passerror}</p>}
                        <button
                            type="submit"
                            className="bg-[#ff751f] hover:bg-[#e66412] cursor-pointer py-3 rounded font-semibold"
                        >
                            {isLogin ? "Sign In" : "Sign Up"}
                        </button>
                    </form>

                    {isLogin && (<div className="mt-4 text-sm flex justify-between text-gray-400">
                        <a href="/" className="hover:underline">
                            Forgot password?
                        </a>
                    </div>)}

                    {!isLogin ? (
                        <p className="mt-6 text-gray-400">
                            Already a user ?{" "}
                            <Link to={"/"}><span className="text-white hover:underline">
                                Sign In now.
                            </span></Link >
                        </p>
                    ) : (<p className="mt-6 text-gray-400">
                        New to Netflix?{" "}
                        <Link to={"/signup"}><span className="text-white hover:underline">
                            Sign up now.
                        </span></Link >
                    </p>)}

                    <button className="my-3 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition cursor-pointer" onClick={() => {
                        signInWithPopup(auth, provider)
                            .then((result) => {
                                console.log("Google login success:", result.user);
                                // You don't need to manually dispatch, onAuthStateChanged in Header will handle it
                            })
                            .catch((error) => {
                                console.error("Google login error:", error.message);
                            });
                    }}><FcGoogle size={20} /><span className="text-gray-700 font-medium">Sign in with Google</span></button>

                </div>
            </div>
        </div>
    );
}