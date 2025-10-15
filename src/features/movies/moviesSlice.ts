import { createSlice } from "@reduxjs/toolkit";
import type { MoviesState } from "./moviesTypes";
import { fetchMovies } from "./moviesThunk";



const initialState: MoviesState = {
    movies: [],
    loading: true,
    error: null,
    success: false,

}


const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;

        })

        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload.movies;

            state.loading = false;
            state.success = true
        })

        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.error = action.payload as string || "Failed to fetch movies";
            state.loading = false;
        })

    }
})


export default movieSlice.reducer