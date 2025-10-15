import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import type { Movie } from "../movies/moviesTypes";

// ------ STATE ------

export interface MovieDetailState {
    selectedMovie: Movie | null;
    selectedTheater: Theater | null;
    selectedScreen: Screen | null;
    selectedDate: string | null;
    selectedShow: Show | null;
    theaters: Theater[];
    loading: boolean;
    error: string | null;
    success: boolean;
}

// ------ API RESPONSE TYPES ------

export interface FetchShowsResponse extends BaseResponse {
    theaters: Theater[];
}

// ------ CORE ENTITIES ------

export interface Theater {
    theaterId: string;
    name: string;
    location: string;
    city: string;
    state: string;
    screens: Screen[];
}

export interface Screen {
    screenId: string;
    name: string;
    dates: DateWithShows[];
    theater?: Theater;
}

export interface DateWithShows {
    date: string;
    shows: Show[];
}

export interface Show {
    showId: string;
    startTime: string;
    basePrice: number;
    movie?: Movie;
    screen?: Screen;
    totalSeats?: number;
    bookedSeats?: number;
    availableSeats?: number;
}
