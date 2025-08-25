import logo from '../assets/logo.svg'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user); // 👀 Debug
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

    return <>

        <div className="absolute top-6 w-full px-10 flex justify-between items-center ">
            <img
                src={logo}
                alt="CineGuide"
                className="w-30 sm:w-40 h-auto"
            />
            <div>
                {user && (
                    <div className='flex gap-4'>
                        <img src={user.photoURL} className='rounded-full' alt="" />
                        <button onClick={() => {
                            signOut(auth).then(() => {
                                navigate('/')
                            }).catch((error) => {
                                navigate('/error')
                            });

                        }} className="bg-amber-600 cursor-pointer hover:bg-red-600 text-black font-bold py-2 px-4 rounded-lg transition duration-300">
                            Sign Out
                        </button>
                    </div>)}
            </div>
        </div>
    </>
}

export default Header
