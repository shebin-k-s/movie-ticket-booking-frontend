import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SeatsResponse } from "./seatsTypes";
import { SeatsApi } from "../../api/endpoints/seatsApi";

export const fetchSeats = createAsyncThunk<
    SeatsResponse,
    string,
    { rejectValue: string }

>(
    "seats/fetchSeats",
    async (showId, thunkApi) => {
        try {
            return await SeatsApi.fetchSeats(showId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
);
