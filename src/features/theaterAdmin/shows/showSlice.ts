import { createSlice } from "@reduxjs/toolkit";
import type { ShowsState } from "./showType";
import { createShow, fetchScreenShows } from "./showThunk";

const initialState: ShowsState = {
    showsByDate: null,
    loading: false,
    screenId: null,
    event: null,
    successMessage: null,
    error: null,
    success: false,
};

const showsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        clearShowsMessage: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder

            //------ CREATE SHOW --------
            .addCase(createShow.pending, (state, _) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
                state.event = 'create';

            })
            .addCase(createShow.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.success = true;
            })
            .addCase(createShow.rejected, (state, action) => {
                state.loading = false;
                state.successMessage = null;
                state.error = action.payload || "Failed to fetch shows";
            })

            //------ FETCH SCREEN SHOWS --------
            .addCase(fetchScreenShows.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
                state.event = 'fetch';


                const screenId = action.meta.arg;

                state.screenId = screenId;
            })
            .addCase(fetchScreenShows.fulfilled, (state, action) => {

                state.loading = false;
                state.showsByDate = action.payload.showsByDate;
                state.successMessage = action.payload.message;
                state.success = true;

            })
            .addCase(fetchScreenShows.rejected, (state, action) => {
                state.loading = false;
                state.showsByDate = null;
                state.successMessage = null;
                state.error = action.payload || "Failed to fetch shows";
            });
    },
});

export const { clearShowsMessage } = showsSlice.actions;
export default showsSlice.reducer;
