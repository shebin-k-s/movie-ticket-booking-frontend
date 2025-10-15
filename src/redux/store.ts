import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import movieReducer from "../features/movies/moviesSlice";
import MovieDetailReducer from "../features/movieDetail/movieDetailSlice";
import SeatsReducer from "../features/seats/seatsSlice";
import bookingsReducer from "../features/booking/bookingSlice";
import ticketsReducer from "../features/tickets/ticketsSlice";
import screensReducer from "../features/theaterAdmin/screen/screenSlice";
import showsReducer from "../features/theaterAdmin/shows/showSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer,
        movieDetail: MovieDetailReducer,
        seats: SeatsReducer,
        bookings: bookingsReducer,
        tickets: ticketsReducer,
        shows: showsReducer,
        screens: screensReducer,
    }
})



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch