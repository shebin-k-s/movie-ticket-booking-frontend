import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Movie, MovieResponse } from "./moviesTypes";
import { MovieApi } from "../../api/endpoints/movieApi";
import type { BaseResponse } from "../../redux/commonTypes/commonTypes";


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


export const createMovie = createAsyncThunk<
    BaseResponse,
    Movie,
    { rejectValue: string }
>(
    "movies/createMovie",
    async (payload, thunkApi) => {

        try {

            return await MovieApi.createMovie(payload);

        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }

    }
)