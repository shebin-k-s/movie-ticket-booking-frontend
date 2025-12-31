import { createSlice } from "@reduxjs/toolkit";
import type { MoviesState } from "./moviesTypes";
import { createMovie, fetchMovies } from "./moviesThunk";



const initialState: MoviesState = {
    movies: [],
    loading: true,
    error: null,
    success: false,
    event: null,
    successMessage: null

}


const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;

        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.event = 'fetch';
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


        // --------- ADD MOVIES --------
        builder.addCase(createMovie.pending, (state) => {
            state.loading = true;
            state.event = 'create';
            state.error = null;
            state.success = false;
            state.successMessage = null;

        })

        builder.addCase(createMovie.fulfilled, (state, action) => {

            state.loading = false;
            state.success = true;
            state.successMessage = action.payload.message;
        })

        builder.addCase(createMovie.rejected, (state, action) => {
            state.error = action.payload as string || "Failed to fetch movies";
            state.loading = false;
        })

    }
})


export const { clearMessages } = movieSlice.actions;

export default movieSlice.reducer