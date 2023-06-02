import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';


// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

// the initial state
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

// register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        const message = (error.response.data && 
            error.response.data.message && 
            error.response) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
     }
}); 


//login user
export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        const message = (error.response.data && 
            error.response.data.message && 
            error.response) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// logout user
export const logout = createAsyncThunk("auth/logout", async () => {
    return authService.logout();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // these are not async functions
        reset: (state) => {
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false
        },
    },
        // these are async functions
        extraReducers: (builder) => {
            builder
                .addCase(register.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(register.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload
                })
                .addCase(register.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.user = null
                    state.message = action.payload
                })
                .addCase(login.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload
                })
                .addCase(login.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.user = null
                    state.message = action.payload
                })
                .addCase(logout.fulfilled, (state) => {
                    state.user = null
                })
        },
});

export const {reset} = authSlice.actions;
export default authSlice.reducer; 