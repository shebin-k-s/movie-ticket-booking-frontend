// export const BASE_URL = 'http://localhost:3000/api/v1';
export const BASE_URL = 'https://movie-ticket-booking-backend-4bre.onrender.com/api/v1/';

export const API_ROUTES = {
    AUTH: {
        REGISTER: `/auth/register`,
        LOGIN: `/auth/login`,
    },
    MOVIE: {
        FETCH_MOVIES: `/movies`
    },
    THEATER: {
        CREATE: `/theaters`
    },
    SHOWS: {
        FETCH_BY_MOVIES: (movieId: string) => `/shows/movies/${movieId}`,
        CREATE_SHOW: `/shows`,
    },
    SEATS: {
        FETCH_SEATS: (showId: string) => `/seats/shows/${showId}`
    },
    BOOKING: {
        INITIATE_BOOKING: `/seats/book/initiate`,
        CANCEL_BOOKING: `/seats/book/cancel`
    },
    PAYMENT: {
        INITIATE_PAYMENT: `/payments/initiate`,
    },
    TICKETS: {
        MY_TICKETS: `bookings/my`
    },
    SCREENS: {
        CREATE_SCREEN:'/screens',
        MY_SCREENS: `/screens/my`,
        SHOWS: (screenId: string) => `/screens/${screenId}/shows`

    }

}