import React from "react";

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="relative w-10 h-5">
                <div className="absolute sm:w-10 w-10 sm:h-5 h-5 border-4  border-amber-600 rounded-full animate-pulse"></div>
                <div className="absolute sm:w-10 w-10 sm:h-5 h-5 border-4 border-gray-300  rounded-full animate-spin"></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;
