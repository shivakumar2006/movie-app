import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // store the user data...
        },
        logOutUser: (state) => {
            state.user = null; // reset user data on logout...
        }
    }
})

export const { setUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;