import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addSearchResult } from '../redux/aiKeySlice'

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
            dispatch(addSearchResult(text))
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
