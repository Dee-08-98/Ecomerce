import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Initial state
const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

// Create auth slice
const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        userExist: (state, action) => {
               state.user = action.payload
               state.isAuthenticated = action.payload ? true : false
            // state.user = null
            // state.isAuthenticated =  false
            console.log('my-payload are :- ',action.payload);

        },
        userNotExist: (state, action) => {
            state.user = null
            state.isAuthenticated = false
        },
    },

});

// Export the setUser action
export const { userExist, userNotExist } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
