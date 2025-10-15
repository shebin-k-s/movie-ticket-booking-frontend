import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Screen, MovieDetailState, Show, Theater } from "./movieDetailTypes";
import { storage } from "../../utils/localStorage";
import { fetchShowsByMovie } from "./movieDetailThunk";
import type { Movie } from "../movies/moviesTypes";

const movieDetailStorageKey = "movieDetailSelections";

const defaultState: MovieDetailState = {
    selectedMovie: null,
    selectedTheater: null,
    selectedScreen: null,
    selectedDate: null,
    selectedShow: null,
    theaters: [],
    loading: false,
    error: null,
    success: false,
};

const storedState = storage.get(movieDetailStorageKey) || {};
const initialState: MovieDetailState = { ...defaultState, ...storedState };

const saveToStorage = (state: MovieDetailState) => {
    const { selectedMovie, selectedTheater, selectedScreen, selectedDate, selectedShow } = state;
    storage.set(movieDetailStorageKey, {
        selectedMovie,
        selectedTheater,
        selectedScreen,
        selectedDate,
        selectedShow,
    });
};

const clearStorage = () => {
    storage.remove(movieDetailStorageKey);
};

const movieDetailSlice = createSlice({
    name: "movieDetail",
    initialState,
    reducers: {
        setSelectedMovie: (state, action: PayloadAction<Movie>) => {
            state.selectedMovie = action.payload;
            state.selectedTheater = null;
            state.selectedScreen = null;
            state.selectedShow = null;
            saveToStorage(state);
        },
        setSelectedTheater: (state, action: PayloadAction<Theater>) => {
            state.selectedTheater = action.payload;
            state.selectedScreen = null;
            state.selectedShow = null;
            saveToStorage(state);
        },
        setSelectedScreen: (state, action: PayloadAction<Screen>) => {
            state.selectedScreen = action.payload;
            state.selectedShow = null;
            saveToStorage(state);
        },
        setSelectedDate: (state, action: PayloadAction<string>) => {
            state.selectedDate = action.payload;
            state.selectedShow = null;
            saveToStorage(state);
        },
        setSelectedShow: (state, action: PayloadAction<Show>) => {
            state.selectedShow = action.payload;
            saveToStorage(state);
        },
        clearSelectedMovie: (state) => {
            state.selectedMovie = null;
            state.selectedTheater = null;
            state.selectedScreen = null;
            state.selectedDate = null;
            state.selectedShow = null;
            state.theaters = [];
            state.success = false;
            clearStorage();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShowsByMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchShowsByMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.theaters = action.payload.theaters;
                state.success = true;
            })
            .addCase(fetchShowsByMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || "Failed to fetch theaters";
            });
    },
});

export const {
    setSelectedMovie,
    setSelectedTheater,
    setSelectedScreen,
    setSelectedDate,
    setSelectedShow,
    clearSelectedMovie,
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
