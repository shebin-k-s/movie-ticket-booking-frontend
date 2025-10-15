import { createAsyncThunk } from "@reduxjs/toolkit";
import type { InitiateBookingPayload, InitiateBookingResponse, InitiatePaymentPayload, InitiatePaymentResponse } from "./bookingType";
import { BookingApi } from "../../api/endpoints/bookingApi";
import type { BaseResponse } from "../../redux/commonTypes/commonTypes";

export const initiateBooking = createAsyncThunk<
    InitiateBookingResponse,
    InitiateBookingPayload,
    { rejectValue: string }
>(
    "bookings/initiateBooing",
    async (payload, thunkApi) => {
        try {

            return await BookingApi.initiateBooking(payload)
        } catch (error: any) {
            console.log(error);

            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const initiatePayment = createAsyncThunk<
    InitiatePaymentResponse,
    InitiatePaymentPayload,
    { rejectValue: string }
>(
    "bookings/initiatePayment",
    async (payload, thunkApi) => {
        try {

            return await BookingApi.initiatePayment(payload)
        } catch (error: any) {
            console.log(error);

            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const cancelBooking = createAsyncThunk<
    BaseResponse,
    string,
    { rejectValue: string }
>(
    "bookings/cancelBooking",
    async (bookingId, thunkApi) => {
        try {
            return await BookingApi.cancelBooking(bookingId)
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// export const confirmBooking = createAsyncThunk<
//     BaseResponse,
//     string,
//     { rejectValue: string }
// >(
//     "bookings/confirmBooking",
//     async (bookingId, thunkApi) => {
//         try {
//             return await BookingApi.confirmBooking(bookingId)
//         } catch (error: any) {
//             return thunkApi.rejectWithValue(error.message);
//         }
//     }
// );