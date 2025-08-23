import React from 'react'
import logo from '../assets/logo.svg'

function Header() {
    return <>
        <div className="absolute inset-0 hidden sm:block">
            <img
                src="https://m.media-amazon.com/images/G/31/AmazonVideo/2021/X-site/MLP/TVOD/TVOD_MLP_Right.jpg"
                alt="background"
                className="w-full h-full object-cover sm:displa"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute top-6 left-10">
            <img
                src={logo}
                alt="CineGuide"
                className="w-30 sm:w-40"
            />
        </div>
    </>
}

export default Header
