import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addSearchResult } from '../redux/aiKeySlice'
import { options } from "../utils/constants";

function useGeminiSearch() {
    const apiKey = useSelector((store) => store.aiKey.aiKey);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()


    const searchMovies = async (query) => {
        if (!apiKey) {
            alert("Please enter your Gemini API key first!");
            return;
        }

        try {
            setLoading(true);
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const response = await model.generateContent(`You are a movie recommendation engine. The user will give their mood or preference. Return ONLY a list of 10 movie titles separated by commas. Do not add any explanations, numbering, or extra text. User input: ${query}`);
            const text = response.response.text();
            const movieNames = text.split(",").map((m) => m.trim());

            const tmdbResults = await Promise.all(
                movieNames.map(async (name) => {
                    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=true&language=en-US&page=1`, options)
                    const data = await res.json();
                    return data.results?.[0];
                })
            )
            dispatch(addSearchResult(tmdbResults));

        } catch (err) {
            console.error(err);
            alert("Something went wrong with Gemini API!");
        } finally {
            setLoading(false);
        }
    };

    return { searchMovies, loading };
}

export default useGeminiSearch;
