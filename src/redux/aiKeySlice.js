import { createSlice } from "@reduxjs/toolkit";

export const aiKeySlice = createSlice({
    name: "aiKey",
    initialState: { aiKey: localStorage.getItem("aiKey") || "" },
    reducers: {
        addAIKey: (state, action) => {
            state.aiKey = action.payload;
            localStorage.setItem("aiKey", action.payload);
        },
        clearAIKey: (state) => {
            state.aiKey = "";
            localStorage.removeItem("aiKey");
        },
    },
});

export const { addAIKey, clearAIKey } = aiKeySlice.actions;
export default aiKeySlice.reducer;
