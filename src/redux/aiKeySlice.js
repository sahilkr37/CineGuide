import { createSlice } from "@reduxjs/toolkit";

export const aiKeySlice = createSlice({
    name: "aiKey",
    initialState: { aiKey: localStorage.getItem("aiKey") || "", searchResult: null, searchMovieList: null },
    reducers: {
        addAIKey: (state, action) => {
            state.aiKey = action.payload;
            localStorage.setItem("aiKey", action.payload);
        },
        clearAIKey: (state) => {
            state.aiKey = "";
            localStorage.removeItem("aiKey");
        },
        addSearchResult: (state, action) => {
            state.searchResult = action.payload
        },
        addSearchMovieList: (state, action) => {
            state.searchMovieList = action.payload
        }
    },
});

export const { addAIKey, clearAIKey, addSearchResult, addSearchMovieResult } = aiKeySlice.actions;
export default aiKeySlice.reducer;
