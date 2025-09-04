import React from "react";

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-20 h-20">
                <div className="absolute sm:w-20 w-10 sm:h-10 h-5 border-4  border-amber-600 rounded-full animate-pulse"></div>
                <div className="absolute sm:w-20 w-10 sm:h-10 h-5 border-4 border-gray-300  rounded-full animate-spin"></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;
