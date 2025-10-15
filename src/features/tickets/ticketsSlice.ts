import { createSlice } from "@reduxjs/toolkit";
import type { ticketsState } from "./ticketsType";
import { fetchMyTickets } from "./ticketsThunk";


const initialState: ticketsState = {
    tickets: [],
    loading: false,
    error: null,
    successMessage: null
}


const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchMyTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.tickets = action.payload.bookings;
            })
            .addCase(fetchMyTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fecth tickets"
            })

    }
})


export default ticketsSlice.reducer