import { createSlice } from "@reduxjs/toolkit";
import type { ScreensState } from "./screenType";
import { fetchMyScreens } from "./screenThunk";

const initialState: ScreensState = {
    screens: [],
    loading: false,
    successMessage: null,
    error: null,
    success: false,
};

const screensSlice = createSlice({
    name: "screens",
    initialState,
    reducers: {
        clearScreenMessage: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder

            //------ FETCH MY SCREEN --------
            .addCase(fetchMyScreens.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchMyScreens.fulfilled, (state, action) => {
                state.loading = false;
                state.screens = action.payload.screens;
                state.successMessage = action.payload.message;
                state.success = true;
            })
            .addCase(fetchMyScreens.rejected, (state, action) => {
                state.loading = false;
                state.successMessage = null;
                state.error = action.payload || "Failed to fetch screens";
            })

    },
});

export const { clearScreenMessage } = screensSlice.actions;
export default screensSlice.reducer;
