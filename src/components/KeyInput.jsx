import React, { useState } from "react";
import { X } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { addAIKey } from "../redux/aiKeySlice";

const KeyInput = ({ showKeyInputBox, setShowKeyInputBox }) => {

    const dispatch = useDispatch();
    const savedKey = useSelector((store) => store.aiKey.aiKey || []);
    const [aiKey, setAiKey] = useState(savedKey || "");

    return (
        <>
            <div className="fixed inset-0 bg-gray-800 sm:bg-black/80 z-40 flex items-center justify-center">
                <X
                    className="absolute right-10 top-10 cursor-pointer text-red-800 scale-200 transition-all"
                    onClick={() => setShowKeyInputBox(!showKeyInputBox)}
                />

                <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md text-white">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Enter Your Gemini API Key
                    </h2>

                    <p className="text-sm text-gray-300 mb-6 text-center">
                        To use AI movie recommendations, you need a Gemini API key.
                        You can generate one at{" "}
                        <a
                            href="https://aistudio.google.com/app/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 underline hover:text-amber-300"
                        >
                            Google AI Studio
                        </a>.
                    </p>

                    <input
                        type="password"
                        placeholder="Paste your Gemini API key here..."
                        value={aiKey}
                        onChange={(e) => setAiKey(e.target.value)}
                        className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <button
                        onClick={() => {
                            if (aiKey.trim()) {
                                dispatch(addAIKey(aiKey));
                                setShowKeyInputBox(false);
                            } else {
                                alert("Please enter a valid Gemini API key");
                            }
                        }}
                        className="w-full bg-amber-600 cursor-pointer hover:bg-amber-500 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Save Key
                    </button>
                </div>
            </div>
        </>

    )
}
export default KeyInput;
