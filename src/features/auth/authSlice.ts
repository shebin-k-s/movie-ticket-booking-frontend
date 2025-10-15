import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import { loginUser, registerUser } from "./authThunk";
import { storage } from "../../utils/localStorage";


const userStorageKey = "user";
export const accessStorageKey = "accessToken";
const theaterStorageKey = "theater";


const initialState: AuthState = {
    user: storage.get(userStorageKey),
    loading: false,
    error: null,
    success: false,
    successMessage: null,
    theater: storage.get(theaterStorageKey),
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.theater = null;
            storage.remove(userStorageKey)
            storage.remove(accessStorageKey)
            storage.remove(theaterStorageKey)
        },
        clearAuthError: (state) => {
            state.error = null;
        },
        clearAuthSuccess: (state) => {
            state.success = false;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {

        // ------ LOGIN --------
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user
            state.success = true;
            state.successMessage = action.payload.message;
            state.theater = action.payload.theater;

            storage.set(userStorageKey, action.payload.user)
            storage.set(accessStorageKey, action.payload.accessToken)
            storage.set(theaterStorageKey, action.payload.theater)

        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Login failed';

        })

        // ------ REGISTER --------
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = action.payload.message;



        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Registartion failed';

        })

    }
})


export const { logout, clearAuthError, clearAuthSuccess } = authSlice.actions;

export default authSlice.reducer