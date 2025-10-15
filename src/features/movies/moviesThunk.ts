import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MovieResponse } from "./moviesTypes";
import { MovieApi } from "../../api/endpoints/movieApi";


export const fetchMovies = createAsyncThunk<
    MovieResponse,
    void,
    { rejectValue: string }

>(
    "movies/fetchMovies",
    async (_, thunkApi) => {
        try {

            return await MovieApi.fetchMovies()

        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }

    }
)