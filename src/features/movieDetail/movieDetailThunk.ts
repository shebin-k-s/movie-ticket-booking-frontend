import { createAsyncThunk } from "@reduxjs/toolkit";
import { ShowApi } from "../../api/endpoints/showApi";
import type { FetchShowsResponse } from "./movieDetailTypes";

export const fetchShowsByMovie = createAsyncThunk<
    FetchShowsResponse,
    string
>(
    "movieDetail/fetchShowsByMovie",
    async (movieId, thunkApi) => {
        try {
            return await ShowApi.fetchShowsByMovie(movieId)
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }

    }
);