import { createSlice } from "@reduxjs/toolkit";

export const loginSlice: any = createSlice({
    name: "login",
    initialState: {
        username: localStorage.getItem("Data") ? JSON.parse(localStorage.getItem("Data") || "") : 0,
    },
    reducers: {
        loginuser: (state, action) => {
            state.username = action.payload;
        }
        
    }
})

export const { loginuser,add } = loginSlice.actions;

export default loginSlice.reducer;