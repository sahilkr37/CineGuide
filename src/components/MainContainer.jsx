import React, { useEffect, useState } from "react";
import { options } from "../utils/constants";
import { useSelector } from "react-redux";
import MainContainerDetails from "./MainContainerDetails";
import LoadingSpinner from './LoadingSpinner'

function MainContainer() {
    const nowPlaying = useSelector((store) => store.movies?.nowPlaying);

    // Random movie state
    const [mainMovie, setMainMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    // pick random movie whenever nowPlaying changes
    useEffect(() => {
        if (nowPlaying?.length > 0) {
            const randomIndex = Math.floor(Math.random() * nowPlaying.length);
            setMainMovie(nowPlaying[randomIndex].id);
        }
    }, [nowPlaying]);

    const getMovieVideo = async () => {
        if (!mainMovie) return;
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${mainMovie}/videos`,
            options
        );
        const json = await data.json();

        // Prefer trailer, fallback to first video
        const trailer =
            json.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            ) || json.results[0];

        setTrailerKey(trailer ? trailer.key : null);
    };

    useEffect(() => {
        getMovieVideo();
    }, [mainMovie]);

    return (
        <div className="relative w-screen sm:h-screen h-100 ">
            <div className="relative w-full sm:h-[80vh] h-3/4">
                {trailerKey ? (
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&rel=0&modestbranding=1&showinfo=0`}
                        title="Movie Trailer"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; fullscreen"
                    ></iframe>
                ) : (
                    <p className="text-white text-xl flex justify-center items-center h-full">
                        <LoadingSpinner />
                    </p>
                )}
                <MainContainerDetails mainMovieId={mainMovie} />
            </div>

        </div>
    );
}

export default MainContainer;
