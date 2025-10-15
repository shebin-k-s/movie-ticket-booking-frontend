import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingState, InitiateBookingResponse, InitiatePaymentResponse } from "./bookingType";
import { cancelBooking, initiateBooking, initiatePayment } from "./bookingThunk";
import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import { storage } from "../../utils/localStorage";



const bookingStorageKey = "currentBooking";

const defaultState: BookingState = {
    bookingId: null,
    seats: [],
    totalAmount: 0,
    loading: false,
    event: null,
    error: null,
    successMessage: null,
    paymentOrder: null,
};

const persistedState = storage.get(bookingStorageKey) as BookingState | null;

const initialState: BookingState = {
    ...defaultState,
    ...persistedState,
};

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        resetBooking: (_) => {
            const newState = { ...defaultState };
            storage.remove(bookingStorageKey);
            return newState;
        },
        clearBookingMessage: (state) => {
            state.error = null;
            state.successMessage = null;
            storage.set(bookingStorageKey, state)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initiateBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(initiateBooking.fulfilled, (state, action: PayloadAction<InitiateBookingResponse>) => {
                state.loading = false;
                state.bookingId = action.payload.bookingId;
                state.seats = action.payload.seats;
                state.successMessage = action.payload.message;
                state.totalAmount = action.payload.totalAmount;

                storage.set(bookingStorageKey, state);
            })
            .addCase(initiateBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Booking failed";
            })

            // Cancel Booking
            .addCase(cancelBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.event = 'cancel';
                state.successMessage = null;

            })
            .addCase(cancelBooking.fulfilled, (state, action: PayloadAction<BaseResponse>) => {
                state.loading = false;
                state.bookingId = null;
                state.seats = [];
                state.event = null;
                state.successMessage = action.payload.message;

            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.loading = false;
                state.event = null;
                state.error = action.payload || "Booking cancel failed";
            })

            // Initiate Payment
            .addCase(initiatePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.event = 'continue';
                state.successMessage = null;

            })
            .addCase(initiatePayment.fulfilled, (state, action: PayloadAction<InitiatePaymentResponse>) => {
                state.loading = false;
                state.event = null;
                state.paymentOrder = action.payload.paymentOrder;

            })
            .addCase(initiatePayment.rejected, (state, action) => {
                state.loading = false;
                state.bookingId = null;
                state.error = action.payload || "Booking cancel failed";
            })


        // Confirm Booking
        // .addCase(confirmBooking.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        //     state.successMessage = null;

        // })
        // .addCase(confirmBooking.fulfilled, (state, action: PayloadAction<BaseResponse>) => {
        //     state.loading = false;
        //     state.bookingId = null;
        //     state.seats = [];
        //     state.successMessage = action.payload.message;

        // })
        // .addCase(confirmBooking.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload || "Booking Confirm failed";
        // });
    },
});

export const { resetBooking, clearBookingMessage } = bookingSlice.actions;
export default bookingSlice.reducer;
